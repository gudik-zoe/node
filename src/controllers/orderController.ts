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
    const orders = await orderSchema.find();
    return res.json(orders);
  } catch (err) {
    next(err);
  }
};
