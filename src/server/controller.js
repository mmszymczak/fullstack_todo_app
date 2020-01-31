import { connectDB } from './connectDB';

export const addNewTask = async task => {
  const db = await connectDB();
  const collection = db.collection('tasks');
  await collection.insertOne(task);
};

export const updateTask = async task => {
  const { id, group, isComplete, name } = task;
  const db = await connectDB();
  const collection = db.collection('tasks');

  if (group) {
    await collection.updateOne({id}, {$set: {group}});
  }

  if (name) {
    await collection.updateOne({id}, {$set: {name}});
  }

  if (isComplete !== undefined) {
    await collection.updateOne({id}, {$set: {isComplete}});
  }
};
