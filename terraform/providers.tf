terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.2.0" # Updated to a version that supports Amplify VPC config
    }
  }
}

provider "aws" {
  region = var.aws_region
}