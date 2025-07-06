import mongoose from 'mongoose';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://akupheapply:FGGdUuegGqYH9oSy@cluster0.ynlsa3n.mongodb.net/portfolio?retryWrites=true&w=majority';

// Define Service schema
const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  priority: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

// Sample services data
const servicesData = [
  {
    priority: 1,
    icon: 'AwsIcon',
    title: 'Cloud Infrastructure Design & Deployment',
    description: 'I architect and deploy secure, scalable, and highly available cloud infrastructure on AWS using best practices and Infrastructure as Code.'
  },
  {
    priority: 2,
    icon: 'DockerIcon',
    title: 'Containerization & Orchestration',
    description: 'Transform your applications with Docker containers and Kubernetes orchestration for improved scalability and deployment efficiency.'
  },
  {
    priority: 3,
    icon: 'JenkinsIcon',
    title: 'CI/CD Pipeline Implementation',
    description: 'Automate your entire software delivery process with robust CI/CD pipelines using Jenkins, GitLab CI, or GitHub Actions.'
  },
  {
    priority: 4,
    icon: 'TerraformIcon',
    title: 'Infrastructure as Code (IaC)',
    description: 'Manage your infrastructure using Terraform and CloudFormation for consistent, repeatable, and version-controlled deployments.'
  },
  {
    priority: 5,
    icon: 'PrometheusIcon',
    title: 'Monitoring & Observability',
    description: 'Implement comprehensive monitoring solutions with Prometheus, Grafana, and ELK stack for real-time insights and alerting.'
  },
  {
    priority: 6,
    icon: 'DevSecOpsIcon',
    title: 'DevSecOps Implementation',
    description: 'Integrate security into every phase of your DevOps pipeline with automated security scanning and compliance checks.'
  },
  {
    priority: 7,
    icon: 'CloudSecurityIcon',
    title: 'Cloud Security & Compliance',
    description: 'Secure your cloud infrastructure with best practices, IAM policies, encryption, and compliance frameworks implementation.'
  },
  {
    priority: 8,
    icon: 'CostOptimizationIcon',
    title: 'Cloud Cost Optimization',
    description: 'Reduce your cloud spending by up to 40% through resource optimization, reserved instances, and automated cost management.'
  }
];

async function seedServices() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check existing services
    const existingCount = await Service.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing services.`);
      const answer = process.argv.includes('--force') ? 'yes' : 'no';
      
      if (answer !== 'yes') {
        console.log('Keeping existing services. Use --force flag to overwrite.');
        await mongoose.connection.close();
        return;
      }
      
      console.log('Clearing existing services...');
      await Service.deleteMany({});
    }

    // Import services
    console.log(`Seeding ${servicesData.length} services...`);
    
    for (const serviceData of servicesData) {
      const service = await Service.create({
        ...serviceData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Added: ${service.title}`);
    }

    const totalServices = await Service.countDocuments();
    console.log(`\n✅ Successfully seeded ${totalServices} services to MongoDB`);

    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('❌ Error seeding services:', error);
    process.exit(1);
  }
}

// Run the seed function
seedServices();