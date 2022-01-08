<<<<<<< HEAD


import * as express from 'express';
const errorHandler = require('../utility/errorHandler');
const User = require('../collections/user');
const ChatRoom = require('../collections/chatRoom');
const tokenDecoder = require('../utility/tokenDecoder');
const io = require('../socket');

exports.sendMessageToHelpCenter = async (req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    try {
        const userId = tokenDecoder.getUserIdFromToken(req);
        let messageBody = req.body.messageBody;
        let theChatRoom = await ChatRoom.findOne({ user: userId });
        if (theChatRoom) {
            theChatRoom.messages.push({
                text: messageBody.text,
                type: messageBody.type
            })
            const savedChatRoom = await theChatRoom.save();
        } else {
            const chatRoom = new ChatRoom();
            chatRoom.user = userId;
            chatRoom.messages.push({
                text: messageBody.text,
                type: messageBody.type,
            })
            const savedChatRoom = await chatRoom.save();
        }
        console.log(userId)
        io.getIO().emit(`sendMessage/${userId}`, { action: 'create', text: messageBody.text, type: messageBody.type });
    } catch (err) {
        next(err)
    }
}

exports.respondeToCustomer = async (req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    try {
        const userId = tokenDecoder.getUserIdFromToken(req);
        io.getIO().emit('sendMessage', { action: 'create', text: req.body.messageBody.text, type: req.body.messageBody.type });
    } catch (err) {
        next(err)
    }
}

exports.getRooms = async (req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    try {
        const rooms = await ChatRoom.find();
        if (rooms) {
            res.status(200).json(rooms)
        }
    } catch (err) {
        next(err)
    }
}

exports.getUserMessages = async (req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    try {
        const userId = tokenDecoder.getUserIdFromToken(req);
        let theChatRoom = await ChatRoom.findOne({ user: userId });
        if (theChatRoom) {
            res.status(200).json(theChatRoom.messages)
        }
    } catch (err) {
        next(err)
    }
}


=======
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
>>>>>>> c18981bb9ade9abaead31088a13c511a4b5541e9
