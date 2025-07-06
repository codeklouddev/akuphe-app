import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/portfolio';

console.log('Testing MongoDB connection...');

try {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB successfully!');
  
  // Test creating a simple document
  const TestSchema = new mongoose.Schema({
    test: String,
    date: Date
  });
  
  const Test = mongoose.models.Test || mongoose.model('Test', TestSchema);
  
  const doc = await Test.create({
    test: 'Connection works!',
    date: new Date()
  });
  
  console.log('✅ Created test document:', doc);
  
  // Clean up
  await Test.deleteOne({ _id: doc._id });
  console.log('✅ Cleaned up test document');
  
  await mongoose.disconnect();
  console.log('✅ Disconnected from MongoDB');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}