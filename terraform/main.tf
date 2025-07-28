#------------------------------------------------------------------------------
# NETWORKING (VPC, Subnets, Security Groups)
#------------------------------------------------------------------------------

# Look up the default VPC and its subnets
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_security_group" "amplify_sg" {
  name        = "${var.app_name}-amplify-sg"
  description = "Security group for Amplify backend"
  vpc_id      = data.aws_vpc.default.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "docdb_sg" {
  name        = "${var.app_name}-docdb-sg"
  description = "Allow traffic to DocumentDB"
  vpc_id      = data.aws_vpc.default.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# This rule allows the Amplify App's backend to talk to the database
resource "aws_security_group_rule" "allow_amplify_to_docdb" {
  type                     = "ingress"
  from_port                = 27017
  to_port                  = 27017
  protocol                 = "tcp"
  security_group_id        = aws_security_group.docdb_sg.id
  source_security_group_id = aws_security_group.amplify_sg.id
}


#------------------------------------------------------------------------------
# DATA TIER (DocumentDB)
#------------------------------------------------------------------------------

resource "aws_docdb_subnet_group" "main" {
  name       = "${var.app_name}-docdb-subnet-group"
  subnet_ids = data.aws_subnets.default.ids
}

resource "aws_docdb_cluster" "main" {
  cluster_identifier      = "${var.app_name}-cluster"
  engine                  = "docdb"
  master_username         = var.db_username
  master_password         = var.db_password
  db_subnet_group_name    = aws_docdb_subnet_group.main.name
  vpc_security_group_ids  = [aws_security_group.docdb_sg.id]
  skip_final_snapshot     = true
}

resource "aws_docdb_cluster_instance" "main" {
  count              = 1
  identifier         = "${var.app_name}-instance-${count.index}"
  cluster_identifier = aws_docdb_cluster.main.id
  instance_class     = "db.t3.medium"
}

#------------------------------------------------------------------------------
# IAM ROLE FOR AMPLIFY
#------------------------------------------------------------------------------

resource "aws_iam_role" "amplify_service_role" {
  name = "${var.app_name}-amplify-service-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "amplify.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "amplify_admin_policy" {
  role       = aws_iam_role.amplify_service_role.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess-Amplify"
}

# Data source to wait for the IAM role to be fully propagated.
# This will only succeed when the role is available via the API.
data "aws_iam_role" "amplify_role_data" {
  name = aws_iam_role.amplify_service_role.name

  depends_on = [
    aws_iam_role_policy_attachment.amplify_admin_policy
  ]
}


#------------------------------------------------------------------------------
# WEB & APP TIER (AWS Amplify for Next.js)
#------------------------------------------------------------------------------

resource "aws_amplify_app" "main" {
  name                 = var.app_name
  repository           = "https://github.com/${var.github_repo}"
  access_token         = var.github_token
  iam_service_role_arn = data.aws_iam_role.amplify_role_data.arn

  # Connects the Amplify backend to our VPC
  vpc_config {
    vpc_id             = data.aws_vpc.default.id
    security_group_ids = [aws_security_group.amplify_sg.id]
    subnet_ids         = data.aws_subnets.default.ids
  }

  # Environment variables for the Next.js app
  environment_variables = {
    DB_CONNECTION_STRING = "mongodb://${var.db_username}:${var.db_password}@${aws_docdb_cluster.main.endpoint}:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
  }

  enable_branch_auto_build = true
  enable_basic_auth        = false

  # This now depends on the data source, ensuring the role is ready
  depends_on = [
    data.aws_iam_role.amplify_role_data
  ]
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.main.id
  branch_name = "main" # Or your default branch
  stage       = "PRODUCTION"
}