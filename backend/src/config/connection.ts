import { MongoClient } from 'mongodb';

const mongoUrl = 'mongodb://mongo_database:27017';

export async function connectToMongo() {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    return client;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}
