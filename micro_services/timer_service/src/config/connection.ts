import mongoose from 'mongoose';

const mongoUrl = 'process.env.MONGO_URI';

export async function connectToMongo() {
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  try {
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected successfully to MongoDB via Mongoose');
  } catch (err) {
    console.error('Failed to connect to MongoDB via Mongoose', err);
    process.exit(1);
  }
}
