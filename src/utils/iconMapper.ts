import {
  AwsIcon,
  DockerIcon,
  KubernetesIcon,
  TerraformIcon,
  JenkinsIcon,
  PrometheusIcon,
  GrafanaIcon,
  AnsibleIcon,
  DevSecOpsIcon,
  CloudSecurityIcon,
  CostOptimizationIcon,
  GitOpsIcon,
  CloudInfrastructureIcon,
  ApiGatewayIcon,
  DatabaseIcon,
  LinuxIcon,
  PythonIcon,
  BashIcon,
  GitIcon,
  AwsLambdaIcon,
  CloudFormationIcon
} from './icons'

// Map of icon names to actual icon components
export const iconMap: Record<string, any> = {
  'AwsIcon': AwsIcon,
  'DockerIcon': DockerIcon,
  'KubernetesIcon': KubernetesIcon,
  'TerraformIcon': TerraformIcon,
  'JenkinsIcon': JenkinsIcon,
  'PrometheusIcon': PrometheusIcon,
  'GrafanaIcon': GrafanaIcon,
  'AnsibleIcon': AnsibleIcon,
  'DevSecOpsIcon': DevSecOpsIcon,
  'CloudSecurityIcon': CloudSecurityIcon,
  'CostOptimizationIcon': CostOptimizationIcon,
  'GitOpsIcon': GitOpsIcon,
  'CloudInfrastructureIcon': CloudInfrastructureIcon,
  'ApiGatewayIcon': ApiGatewayIcon,
  'DatabaseIcon': DatabaseIcon,
  'LinuxIcon': LinuxIcon,
  'PythonIcon': PythonIcon,
  'BashIcon': BashIcon,
  'GitIcon': GitIcon,
  'AwsLambdaIcon': AwsLambdaIcon,
  'CloudFormationIcon': CloudFormationIcon
}

// Get icon component by name
export const getIconByName = (iconName: string) => {
  return iconMap[iconName] || AwsIcon // Default to AWS icon if not found
}