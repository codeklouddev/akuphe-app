#------------------------------------------------------------------------------
# NETWORKING (VPC, Subnets, Security Groups)
#------------------------------------------------------------------------------

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "${var.app_name}-vpc"
  }
}

resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"
  tags = {
    Name = "${var.app_name}-private-subnet-a"
  }
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"
  tags = {
    Name = "${var.app_name}-private-subnet-b"
  }
}

resource "aws_security_group" "amplify_sg" {
  name        = "${var.app_name}-amplify-sg"
  description = "Security group for Amplify backend"
  vpc_id      = aws_vpc.main.id

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
  vpc_id      = aws_vpc.main.id

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
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]
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
# WEB & APP TIER (AWS Amplify for Next.js)
#------------------------------------------------------------------------------

resource "aws_amplify_app" "main" {
  name         = var.app_name
  repository   = "https://github.com/${var.github_repo}"
  access_token = var.github_token

  # Connects the Amplify backend to our VPC
  #vpc_config {
    #vpc_id             = aws_vpc.main.id
    #security_group_ids = [aws_security_group.amplify_sg.id]
    #subnet_ids         = [aws_subnet.private_a.id, aws_subnet.private_b.id]
  #}

  # Environment variables for the Next.js app
  environment_variables = {
    DB_CONNECTION_STRING = "mongodb://${var.db_username}:${var.db_password}@${aws_docdb_cluster.main.endpoint}:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
  }

  enable_branch_auto_build = true
  enable_basic_auth        = false
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.main.id
  branch_name = "main" # Or your default branch
  stage       = "PRODUCTION"
}