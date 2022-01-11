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
        if (!theChatRoom) {
            throw errorHandler.notFound('chat room');
        }
        theChatRoom.messages.push({
            text: messageBody.text,
            type: messageBody.type
        })
        const savedChatRoom = await theChatRoom.save();
        io.getIO().emit(`sendMessage/${userId}`, { action: 'create', text: messageBody.text, type: messageBody.type });

    } catch (err) {
        next(err)
    }
}

exports.respondeToCustomer = async (req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    try {
        const roomId = req.params.roomId
        let messageBody = req.body.messageBody;
        let theChatRoom = await ChatRoom.findById(roomId);
        if (!theChatRoom) {
            throw errorHandler.notFound('chat room');
        }
        theChatRoom.messages.push({ text: messageBody.text, type: messageBody.type })
        const savedChatRoom = await theChatRoom.save();
        io.getIO().emit(`sendMessage/${theChatRoom.user}`, { action: 'create', text: messageBody.text, type: messageBody.type });
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

exports.getUserRoom = async (req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    try {
        const userId = tokenDecoder.getUserIdFromToken(req);
        let theChatRoom = await ChatRoom.findOne({ user: userId });
        if (theChatRoom) {
            res.status(200).json(theChatRoom)
        } else {
            const chatRoom = new ChatRoom();
            chatRoom.user = userId;
            chatRoom.messages.push({ text: 'hi! this is the admin will be with you in a moment', type: 'admin' });
            const savedChatRoom = await chatRoom.save();
            res.status(200).json(savedChatRoom)
        }
    } catch (err) {
        next(err)
    }
}

exports.getRoomById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const roomId = req.params.roomId
        const theRoom = await ChatRoom.findById(roomId);
        if (!theRoom) {
            throw errorHandler.notFound('chat room');
        }
        return res.status(200).json(theRoom);
    } catch (err) {
        next(err);
    }
};
