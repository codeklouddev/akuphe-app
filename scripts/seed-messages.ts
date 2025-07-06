import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema)

const sampleMessages = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    subject: "DevOps Consultation Request",
    message: "Hi,\n\nI'm the CTO at TechCorp and we're looking for a DevOps consultant to help us migrate our infrastructure to AWS. We currently have a monolithic application and want to move to a microservices architecture using Kubernetes.\n\nWould love to discuss our requirements and see how you can help us with this transformation.\n\nBest regards,\nSarah",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    name: "Michael Chen",
    email: "mchen@startup.io",
    subject: "Urgent: Need help with CI/CD pipeline",
    message: "Hello,\n\nWe're a fast-growing startup and need immediate help setting up a robust CI/CD pipeline. Our deployments are currently manual and taking too much time.\n\nCan we schedule a call this week to discuss?\n\nThanks,\nMichael",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  },
  {
    name: "Emily Rodriguez",
    email: "emily.r@fintech.com",
    subject: "Security Audit for Financial Platform",
    message: "Dear DevOps Expert,\n\nWe're a fintech company looking for someone to conduct a comprehensive security audit of our cloud infrastructure. We need to ensure we're compliant with PCI DSS standards.\n\nOur stack includes:\n- AWS (EC2, RDS, S3)\n- Docker containers\n- Jenkins for CI/CD\n- Kubernetes for orchestration\n\nPlease let me know your availability and rates for such an engagement.\n\nRegards,\nEmily Rodriguez\nHead of Engineering",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    name: "David Kim",
    email: "dkim@enterprise.com",
    subject: "Terraform Implementation Project",
    message: "Hi there,\n\nWe want to implement Infrastructure as Code using Terraform for our multi-cloud environment (AWS and Azure). Looking for an expert who can help us set this up and train our team.\n\nProject duration: 3-4 months\nTeam size: 15 developers\n\nInterested?\n\nDavid",
    read: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    name: "Lisa Thompson",
    email: "lisa@ecommerce.net",
    subject: "Cost Optimization Needed",
    message: "Hello,\n\nOur AWS bills have been increasing significantly over the past few months. We need someone to analyze our infrastructure and help us optimize costs without compromising performance.\n\nCurrent monthly spend: $45,000\nTarget: 30% reduction\n\nCan you help?\n\nLisa",
    read: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    name: "James Wilson",
    email: "jwilson@healthcare.org",
    subject: "HIPAA Compliant Infrastructure Setup",
    message: "Good day,\n\nWe're a healthcare startup and need to ensure our infrastructure is HIPAA compliant. Looking for someone with experience in:\n\n- Setting up HIPAA compliant AWS infrastructure\n- Implementing proper encryption and access controls\n- Setting up audit logs and monitoring\n- Disaster recovery planning\n\nThis is a critical project for us. Please share your experience with similar projects.\n\nBest,\nJames Wilson\nCTO",
    read: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
  },
  {
    name: "Rachel Green",
    email: "rachel@mediacompany.com",
    subject: "Kubernetes Migration Assessment",
    message: "Hi,\n\nWe're considering migrating from our current Docker Swarm setup to Kubernetes. Need someone to assess our current architecture and provide a migration roadmap.\n\nWould you be available for an initial consultation?\n\nRachel",
    read: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    name: "Tom Anderson",
    email: "tom@saas-platform.com",
    subject: "Monitoring and Alerting Setup",
    message: "Hello,\n\nWe need to implement a comprehensive monitoring solution using Prometheus and Grafana. Our application serves 50k+ users and we need proper alerting for any issues.\n\nRequirements:\n- Real-time monitoring dashboards\n- Alert configuration for critical metrics\n- Integration with PagerDuty\n- Custom metrics for business KPIs\n\nLet me know if this is something you can help with.\n\nTom",
    read: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
  }
]

async function seedMessages() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }

    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing messages (optional - comment out if you want to keep existing)
    // await ContactMessage.deleteMany({})
    // console.log('Cleared existing messages')

    // Insert sample messages
    const result = await ContactMessage.insertMany(sampleMessages)
    console.log(`Successfully seeded ${result.length} messages`)

    // Show summary
    const total = await ContactMessage.countDocuments()
    const unread = await ContactMessage.countDocuments({ read: false })
    console.log(`\nTotal messages in database: ${total}`)
    console.log(`Unread messages: ${unread}`)

    await mongoose.connection.close()
    console.log('\nDatabase connection closed')
  } catch (error) {
    console.error('Error seeding messages:', error)
    process.exit(1)
  }
}

seedMessages()