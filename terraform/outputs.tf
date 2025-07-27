output "amplify_app_url" {
  description = "The URL of the deployed Amplify application."
  value       = "https://${aws_amplify_branch.main.branch_name}.${aws_amplify_app.main.id}.amplifyapp.com"
}

output "docdb_cluster_endpoint" {
  description = "The endpoint for the DocumentDB cluster."
  value       = aws_docdb_cluster.main.endpoint
}