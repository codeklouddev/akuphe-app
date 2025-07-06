import mongoose from 'mongoose';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://akupheapply:FGGdUuegGqYH9oSy@cluster0.ynlsa3n.mongodb.net/portfolio?retryWrites=true&w=majority';

// Define Testimonial schema
const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  priority: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

// Sample testimonials data
const testimonialsData = [
  {
    priority: 1,
    name: 'Sarah Johnson',
    designation: 'CTO at Tech Innovations Inc',
    content: 'Akuphe helped us migrate our entire infrastructure to AWS, resulting in 60% cost reduction and improved scalability. His expertise in cloud architecture is exceptional.',
    rating: 5
  },
  {
    priority: 2,
    name: 'Michael Chen',
    designation: 'Engineering Manager at DataFlow Systems',
    content: 'The Kubernetes implementation and CI/CD pipeline Akuphe built for us has transformed our deployment process. We now deploy 10x faster with zero downtime.',
    rating: 5
  },
  {
    priority: 3,
    name: 'Emily Rodriguez',
    designation: 'VP of Engineering at CloudFirst',
    content: 'Working with Akuphe was a game-changer. He automated our entire infrastructure, implemented robust monitoring, and reduced our operational overhead by 70%.',
    rating: 5
  },
  {
    priority: 4,
    name: 'David Thompson',
    designation: 'CEO at StartupHub',
    content: 'Akuphe\'s DevOps expertise helped us scale from 100 to 1M users seamlessly. His proactive monitoring and auto-scaling solutions kept our services running 24/7.',
    rating: 5
  },
  {
    priority: 5,
    name: 'Lisa Anderson',
    designation: 'Product Manager at FinTech Solutions',
    content: 'The security implementations and compliance automation Akuphe provided gave us peace of mind. We passed our SOC2 audit with flying colors thanks to his work.',
    rating: 5
  },
  {
    priority: 6,
    name: 'James Wilson',
    designation: 'Director of IT at HealthTech Corp',
    content: 'Akuphe modernized our legacy infrastructure with containerization and microservices. The improvement in system reliability and developer productivity has been remarkable.',
    rating: 5
  }
];

async function seedTestimonials() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check existing testimonials
    const existingCount = await Testimonial.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing testimonials.`);
      const answer = process.argv.includes('--force') ? 'yes' : 'no';
      
      if (answer !== 'yes') {
        console.log('Keeping existing testimonials. Use --force flag to overwrite.');
        await mongoose.connection.close();
        return;
      }
      
      console.log('Clearing existing testimonials...');
      await Testimonial.deleteMany({});
    }

    // Import testimonials
    console.log(`Seeding ${testimonialsData.length} testimonials...`);
    
    for (const testimonialData of testimonialsData) {
      const testimonial = await Testimonial.create({
        ...testimonialData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Added: ${testimonial.name} - ${testimonial.designation}`);
    }

    const totalTestimonials = await Testimonial.countDocuments();
    console.log(`\n✅ Successfully seeded ${totalTestimonials} testimonials to MongoDB`);

    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
    process.exit(1);
  }
}

// Run the seed function
seedTestimonials();