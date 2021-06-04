import { HookNextFunction } from 'mongoose';
import express from 'express';
import { Error } from './models/error';
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res
      .status(status)
      .json({ status, message, timeStamp: new Date(), data: error.data });
  }
);
mongoose
  .connect(
    'mongodb://localhost:27017/?readPreference=primary&social=MongoDB%20Compass&ssl=false',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then((result: any) => {
    console.log('success');
    app.listen(3000);
  })
  .catch((err: any) => console.log(err));
