import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './connectDB';
import { authenticationRoute } from './authenticate';
import './initializeDB';

const port = process.env.PORT || 3003;
const app = express();

app.listen(port, console.log('Yess, server here. I\'m listening...'));

app.use(cors(), bodyParser.urlencoded({extended: true}), bodyParser.json());

authenticationRoute(app);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('index.html'));
  });
}

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
