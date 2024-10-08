import mongoose from 'mongoose';

// Vérifiez le nom de la base de données ici
const mongoUrl = 'mongodb://mongo_database:27017/db';

export async function connectToMongo() {
  // Écoute les erreurs de connexion
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
