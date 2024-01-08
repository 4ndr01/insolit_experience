// utils/db.js
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://root:root@cluster0.zm4brx5.mongodb.net/';

if (!MONGODB_URI) {
  throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function connectMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
}

export default connectMongoDB;
