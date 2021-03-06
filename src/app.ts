import { HookNextFunction } from 'mongoose';
import express from 'express';
import { CustomeError } from './models/customError';
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const menuRouter = require('./routes/menuRouter');
const appetizerRouter = require('./routes/appetizerRouter');
const drinkRouter = require('./routes/drinkRouter');
const dessertRouter = require('./routes/dessertRouter');
const cardRouter = require('./routes/cardRouter');
const itemRouter = require('./routes/itemRouter');
const orderRouter = require('./routes/orderRouter');
const chatRouter = require('./routes/chatRouter');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);
// app.use('/post', postRouter);
// app.use('/menu', menuRouter);
app.use('/appetizer', appetizerRouter);
app.use('/drink', drinkRouter);
app.use('/dessert', dessertRouter);
app.use('/card', cardRouter);
app.use('/item', itemRouter);
app.use('/order', orderRouter);
app.use('/chat', chatRouter);
app.use(
  (
    error: CustomeError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = error.status || 500;
    const message = error.message || 'unknown error occured';
    console.log(error);
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
    const server = app.listen(3000);
    const io = require('./socket').init(server, {
      cors: {
        origin: '*',
      },
    });
    io.on('connection', (socket: any) => { 
    });
  })
  .catch((err: any) => console.log(err));
