import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://akupheapply:FGGdUuegGqYH9oSy@cluster0.ynlsa3n.mongodb.net/portfolio?retryWrites=true&w=majority';

// Define Project schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  priority: { type: Number, default: 0 },
  cover: { type: String, required: true },
  livePreview: String,
  githubLink: String,
  visitors: String,
  earned: String,
  githubStars: String,
  ratings: String,
  numberOfSales: String,
  type: { type: String, required: true },
  siteAge: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function seedProjects() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Read all project JSON files
    const projectsDir = path.join(__dirname, 'content', 'projects');
    const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.json'));
    
    console.log(`Found ${files.length} project files`);

    // Clear existing projects (optional - comment out if you want to keep existing)
    const existingCount = await Project.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing projects. Keeping them and adding more...`);
      // await Project.deleteMany({});  // Commented out to keep existing
    }

    // Import each project
    for (const file of files) {
      const filePath = path.join(projectsDir, file);
      const projectData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Add default values for required fields if missing
      const projectWithDefaults = {
        ...projectData,
        type: projectData.type || 'Personal Project', // Default type if missing
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      try {
        const project = await Project.create(projectWithDefaults);
        console.log(`✅ Imported: ${project.title}`);
      } catch (error) {
        console.log(`❌ Failed to import ${projectData.title}: ${error.message}`);
      }
    }

    const totalProjects = await Project.countDocuments();
    console.log(`\n✅ Successfully seeded ${totalProjects} projects to MongoDB`);

    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  }
}

// Run the seed function
seedProjects();