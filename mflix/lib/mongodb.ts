// utils/db.js
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://root:root@cluster0.zm4brx5.mongodb.net/';

if (!MONGODB_URI) {
  throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local.local'
  );
}

// @ts-ignore
let cachedConnection = null;

export default async function connectMongoDB() {
  try {
    // @ts-ignore
    if (!cachedConnection) {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      // @ts-ignore
      const connection = await mongoose.connect(MONGODB_URI, options);

      console.log('Connected to the database');
      cachedConnection = connection;
    }

    // @ts-ignore
    return { db: cachedConnection.connection.db };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Unable to connect to the database');
  }
}
