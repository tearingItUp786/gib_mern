import express from 'express';
import connectToDb from './db';
import setupMiddleware from './middleware';
import restRouter from './api/restRouter';
import protect, { verifyUser, signIn } from './api/modules/auth';

const app = express();
setupMiddleware(app);
connectToDb();

app.use('/signin', verifyUser, signIn);
app.use('/api', protect, restRouter);

app.all('*', (req, res) => {
  res.json({ ok: true });
});

export default app;
