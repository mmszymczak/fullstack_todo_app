import { MongoClient } from 'mongodb';

const dbName = 'todoapp';
const url = `mongodb://localhost:27017/${dbName}`;
let db = null;

export async function connectDB() {
  if (db) return db;

  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.log('DB is ', db);
  return db;
}
