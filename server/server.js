import express from 'express';
import connectToDb from './db';

const app = express();
connectToDb();

app.get('/', (req, res) => {
  res.send(`Hello Taran`);
});

export default app;
