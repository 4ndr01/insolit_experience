// utils/db.js
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://root:root@cluster0.zm4brx5.mongodb.net/';

if (!MONGODB_URI) {
  throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

export default async function connectMongoDB() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to the database');

    return { client, db: client.db() };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Unable to connect to the database');
  }
}

