import express from 'express';
const orderSchema = require('../../dist/collections/order.js');
const tokenDecoder = require('../utility/tokenDecoder');
const errorHandler = require('../utility/errorHandler');
const User = require('../collections/user');
const Cart = require('../collections/cart');
exports.addOrder = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = tokenDecoder.getUserIdFromToken(req);
    const theUser = await User.findById(userId);
    if (!theUser) {
      throw errorHandler.notFound('user');
    }
    const theCart = await Cart.findById(theUser.cart);
    if (!theCart) {
      throw errorHandler.notFound('cart');
    }
    const order = new orderSchema();
    order.user = userId;
    order.items = theCart.items;
    const theOrder = await order.save();
    if (theOrder) {
      theCart.items = [];
      theCart.total = 0;
      const savedCart = await theCart.save();
    }
    return res.json(theOrder);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const total = await orderSchema.find().countDocuments();
    const orders = await orderSchema.find();
    return res.json({ total, orders });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orderId = req.params.orderId;
    const theOrder = await orderSchema.findByIdAndRemove(orderId);
    if (!theOrder) {
      throw errorHandler.notFound('order');
    }
    return res.json('order served successfully');
  } catch (err) {
    next(err);
  }
};
