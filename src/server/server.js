import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './connectDB';

const port = 3003;
const app = express();

app.listen(port, console.log('Yess, server here. I\'m listening...'));

app.use(cors(), bodyParser.urlencoded({extended: true}), bodyParser.json());

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

app.post('/task/new', async (req, res) => {
  const task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});

app.post('/task/update', async (req, res) => {
  const task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});
