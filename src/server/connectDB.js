import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';
let db = null;

export async function connectDB() {
  if (db) return db;

  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();

  return db;
}
