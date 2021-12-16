import * as express from 'express';
const io = require('../socket');
exports.getMyConversation = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.sendMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const message = req.body.message;
    console.log(message);
    io.getIO().emit('sendMessage', { action: 'send', message });
    return res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};
