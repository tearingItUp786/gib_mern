import express from 'express';

require('dotenv').config();

const { PORT } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello worlds');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
