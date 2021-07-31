import { error } from 'console';
import * as express from 'express';
import { AbstractMenu } from '../models/abstractMenu';
const bcrypt = require('bcryptjs');
const errorHandler = require('../utility/errorHandler');
const User = require('../collections/user');
const Cart = require('../collections/cart');
const tokenDecoder = require('../utility/tokenDecoder');

exports.addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let itemsArray = req.body;
    const userId = tokenDecoder.getUserIdFromToken(req);
    const signedInUser = await User.findById(userId);
    if (!signedInUser) {
      throw errorHandler.notfound('user');
    }
    const cart = new Cart();
    // if (itemsArray || itemsArray.length > 0) {
    for (let item of itemsArray) {
      switch (item.category) {
        case 'Menu':
          console.log('menu');
          cart.menus.push(item);
          break;
        case 'Drink':
          console.log('Drink');
          cart.drinks.push(item);
          break;
        case 'Dessert':
          console.log('Dessert');
          cart.desserts.push(item);
          break;
        case 'Appetizer':
          console.log('Appetizer');
          cart.appetizers.push(item);
          break;
        default:
          console.log('weila');
          break;
      }
    }
    console.log('arriving here');
    // }
    const savedCard = await cart.save();
    if (!signedInUser.cart || signedInUser.cart == null) {
      console.log('adding the cart to the user');
      signedInUser.cart = savedCard;
    }
    const savedUser = signedInUser.save();
    res.status(200).json(savedCard);
  } catch (err) {
    next(error);
  }
};
