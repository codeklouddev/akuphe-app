// Data for portfolio
import {
  // DevOps/Cloud Icons for services
  AwsIcon,
  CloudSecurityIcon,
  CostOptimizationIcon,
  DevSecOpsIcon,
  JenkinsIcon,
  PrometheusIcon,
  TerraformIcon,
  DockerIcon,
} from '../utils/icons'

// Project Data
export const projects = [
  {
    priority: 1,
    title: 'Project Alpha',
    shortDescription:
      'A groundbreaking project that revolutionizes the way we approach technology. Built with cutting-edge tools for maximum efficiency, it sets new industry standards.',
    cover:
      'https://images.unsplash.com/photo-1585282263861-f55e341878f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    livePreview: 'https://example.com/alpha',
    type: 'Client Work 🙍‍♂️',
    siteAge: '1 month old',
  },
  {
    priority: 2,
    title: 'Project Beta',
    shortDescription:
      'Project Beta is a static technical blog site built with GatsbyJS. I share tips on topics like building reusable components in React, explaining JavaScript methods and concepts, Node.js scripts, and more.',
    cover:
      'https://plus.unsplash.com/premium_photo-1663040328859-48bddaa9dfeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    livePreview: 'https://example.com/beta',
    visitors: '8K Visitors',
    earned: '$400 Earned',
  },
  {
    priority: 3,
    title: 'Project Epsilon',
    shortDescription:
      'A collection of engaging coding challenges designed to help developers improve their ReactJS skills by writing functional business logic. Your task is to make it functional by writing business logic, to improve your frontend skills',
    cover:
      'https://plus.unsplash.com/premium_photo-1661700152890-931fb04588e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    type: 'Free 🔥',
    livePreview: 'https://example.com/epsilon',
    githubLink: 'https://github.com/example/ReactJS-Coding-Challenges',
    githubStars: '40 Stars',
    numberOfSales: '138 Sales',
  },
  {
    priority: 4,
    title: 'Ejucationzz',
    shortDescription:
      'Ejucationzz is a directory site I created for myself using Next.js. On Ejucationzz, you can find free and paid online and offline courses available in Pakistan. 14 academies and 12 main categories, each with subcategories, have been listed. Ejucationzz is a directory site I created for myself using Next.js. On Ejucationzz, you can find free and paid online and offline courses available in Pakistan. 14 academies and 12 main categories, each with subcategories, have been listed.',
    cover:
      'https://images.unsplash.com/photo-1527334919515-b8dee906a34b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'New 🔥',
    livePreview: 'https://example.com/Ejucationzz',
    siteAge: '4 months old',
    visitors: '100 Visitors',
    githubLink: '',
    earned: '',
  },
]

// Service Data
export const serviceData = [
  {
    icon: AwsIcon,
    title: 'Cloud Infrastructure Design & Deployment',
    shortDescription: 'I build secure, scalable, and highly available cloud infrastructure using best practices on AWS. Whether you\'re starting from scratch or optimizing an existing environment, I deliver solutions that grow with your business.',
  },
  {
    icon: JenkinsIcon,
    title: 'CI/CD Pipeline Implementation',
    shortDescription: 'I automate the entire software delivery process using robust CI/CD pipelines. From code to production, I ensure faster, safer, and more reliable deployments - every time.',
  },
  {
    icon: TerraformIcon,
    title: 'Infrastructure as Code (IaC)',
    shortDescription: 'Manual setups are error-prone and slow. I use Terraform and CloudFormation to automate your infrastructure - making it consistent, repeatable, and version-controlled.',
  },
  {
    icon: DockerIcon,
    title: 'Containerization & Orchestration',
    shortDescription: 'Using Docker and Kubernetes (EKS), I containerize applications and deploy them at scale. Zero-downtime deployments, rollbacks, and efficient resource usage are the standard.',
  },
  {
    icon: DevSecOpsIcon,
    title: 'Security & DevSecOps Automation',
    shortDescription: 'Security is not an afterthought. I embed it into every phase of the DevOps pipeline with tools like AWS Security Hub, IAM, and automated vulnerability scans.',
  },
  {
    icon: CloudSecurityIcon,
    title: 'Disaster Recovery & Backup Strategies',
    shortDescription: 'Downtime is expensive. I design resilient systems with automated backups, failover strategies, and cross-region redundancy for business continuity.',
  },
  {
    icon: PrometheusIcon,
    title: 'Performance & Reliability Engineering',
    shortDescription: 'I fine-tune your infrastructure for speed, reliability, and scale. From load testing to chaos engineering, I ensure your systems can handle real-world pressure.',
  },
  {
    icon: CostOptimizationIcon,
    title: 'Cost Optimization & Cloud Governance',
    shortDescription: 'I audit and optimize your AWS spend, implementing automation, tagging strategies, and governance policies to keep costs low and environments clean.',
  },
]

// Skill List - DevOps/Cloud skills only as per logos.txt
export const skillList = [
  {
    name: 'Ansible',
    icon: '/icons/ansible.svg',
  },
  {
    name: 'API Gateway',
    icon: '/icons/api-gateway.svg',
  },
  {
    name: 'AWS',
    icon: '/icons/aws.svg',
  },
  {
    name: 'AWS Lambda',
    icon: '/icons/aws-lambda.svg',
  },
  {
    name: 'Bash',
    icon: '/icons/bash.svg',
  },
  {
    name: 'CloudFormation',
    icon: '/icons/cloudformation.svg',
  },
  {
    name: 'Cloud Infrastructure',
    icon: '/icons/infrastructure-design.svg',
  },
  {
    name: 'Cloud Security',
    icon: '/icons/cloud-security.svg',
  },
  {
    name: 'Cost Optimization',
    icon: '/icons/cost-optimization.svg',
  },
  {
    name: 'Database',
    icon: '/icons/database.svg',
  },
  {
    name: 'DevSecOps',
    icon: '/icons/devsecops.svg',
  },
  {
    name: 'Docker',
    icon: '/icons/docker.svg',
  },
  {
    name: 'Elastic Beanstalk',
    icon: '/icons/aws.svg',
  },
  {
    name: 'Git',
    icon: '/icons/git.svg',
  },
  {
    name: 'GitHub Actions',
    icon: '/icons/git.svg',
  },
  {
    name: 'GitOps',
    icon: '/icons/gitops.svg',
  },
  {
    name: 'Grafana',
    icon: '/icons/grafana.svg',
  },
  {
    name: 'Infrastructure Design',
    icon: '/icons/infrastructure-design.svg',
  },
  {
    name: 'Jenkins',
    icon: '/icons/jenkins.svg',
  },
  {
    name: 'Kubernetes',
    icon: '/icons/kubernetes.svg',
  },
  {
    name: 'Linux',
    icon: '/icons/linux.svg',
  },
  {
    name: 'Prometheus',
    icon: '/icons/prometheus.svg',
  },
  {
    name: 'Python',
    icon: '/icons/python.svg',
  },
  {
    name: 'Terraform',
    icon: '/icons/terraform.svg',
  },
]

export const footerLinks = [
  { title: 'About', href: '#' },
  { title: 'Projects', href: '#projects' },
  { title: 'Testimonials', href: '#testimonials' },
  {
    title: 'Services',
    href: '#services',
  },
  {
    title: 'Contact',
    href: '#contact',
  },
]

export const themes = [
  {
    name: 'Light',
    colors: ['#fff', '#0d1a3b', '#dbe3f7', '#0d1a3b', '#5565e8'],
  },
  {
    name: 'Dark',
    colors: ['#011627', '#607b96', '#0d1a3b', '#5565e8', '#18f2e5'],
  },
  {
    name: 'Aqua',
    colors: ['#b2e4e8', '#004a55', '#00c1d4', '#004a55', '#ff6f61'],
  },
  {
    name: 'Retro',
    colors: ['#fff3e0', '#6d4c41', '#ffcc80', '#5d4037', '#ffab40'],
  },
  {
    name: 'Midnight',
    colors: ['#0f0f23', '#8b92b9', '#1a1a3e', '#6366f1', '#a78bfa'],
  },
  {
    name: 'Forest',
    colors: ['#0d1f0d', '#86a586', '#1a2e1a', '#34d399', '#10b981'],
  },
]

export const languages = ['En', 'Es', 'Fr', 'De', 'Ru']
