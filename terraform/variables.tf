variable "aws_region" {
  description = "The AWS region to deploy resources in."
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "A unique name for the application."
  type        = string
  default     = "my-nextjs-app"
}

variable "db_username" {
  description = "The master username for the DocumentDB cluster."
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "The master password for the DocumentDB cluster."
  type        = string
  sensitive   = true
}

variable "github_repo" {
  description = "Your GitHub repository in format 'owner/repo-name'."
  type        = string
}

variable "github_token" {
  description = "A GitHub personal access token with repo access."
  type        = string
  sensitive   = true
}
