import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const scripts = [
  'seed-projects.mjs',
  'seed-services.mjs', 
  'seed-testimonials.mjs'
];

async function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 Running ${scriptName}...\n`);
    
    const child = spawn('node', [path.join(__dirname, scriptName)], {
      stdio: 'inherit',
      env: process.env
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${scriptName} exited with code ${code}`));
      } else {
        console.log(`\n✅ ${scriptName} completed successfully\n`);
        resolve();
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

async function seedAll() {
  console.log('🌱 Starting database seeding process...\n');
  console.log('This will populate your MongoDB with sample data for:');
  console.log('- Projects');
  console.log('- Services');
  console.log('- Testimonials\n');

  try {
    for (const script of scripts) {
      await runScript(script);
    }
    
    console.log('\n🎉 All seeding completed successfully!');
    console.log('\nYour portfolio now has:');
    console.log('- Sample projects with pagination');
    console.log('- DevOps services in a carousel');
    console.log('- Client testimonials in a carousel');
    console.log('\nYou can now:');
    console.log('1. Run "npm run dev" to see your portfolio');
    console.log('2. Login to /admin to manage content');
    console.log('3. All changes in admin will persist in MongoDB\n');
    
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

// Run the seeding
seedAll();