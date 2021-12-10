import * as express from 'express';
import { isValidObjectId, ObjectId } from 'mongoose';
import { AddToCart } from '../models/addToCart';
const errorHandler = require('../utility/errorHandler');
const User = require('../collections/user');
const Cart = require('../collections/cart');
const Item = require('../collections/item');
const tokenDecoder = require('../utility/tokenDecoder');

exports.addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const receivedBody: AddToCart = req.body;
    const userId = tokenDecoder.getUserIdFromToken(req);
    const signedInUser = await User.findById(userId);
    if (!signedInUser) {
      throw errorHandler.notFound('user');
    }
    const theItem = await Item.findById(receivedBody.itemId);
    if (!theItem) {
      throw errorHandler.notFound();
    }
    let theCart;
    if (isValidObjectId(signedInUser.cart) && signedInUser.cart) {
      theCart = await Cart.findById(signedInUser.cart);
      if (theCart.items.length == 0) {
        theCart.items = [];
      }
    } else {
      theCart = new Cart();
      theCart.total = 0;
      theCart.user = signedInUser.id;
      theCart.items = [];
    }
    const existItem = theCart.items.find(
      (i: any) => i.itemId == receivedBody.itemId
    );
    if (existItem) {
      existItem.quantity = existItem.quantity + receivedBody.quantity;
      theCart.total = theCart.total + theItem.price * receivedBody.quantity;
    } else {
      theCart.items.push({
        itemId: receivedBody.itemId,
        quantity: receivedBody.quantity,
      });
      theCart.total = theCart.total + theItem.price * receivedBody.quantity;
    }
    const savedCard = await theCart.save();
    signedInUser.cart = savedCard.id;
    const savedUser = await signedInUser.save();
    res.status(200).json(savedCard);
  } catch (err) {
    next(err);
  }
};

exports.getMyCart = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = tokenDecoder.getUserIdFromToken(req);
    const signedInUser = await User.findById(userId);
    if (!signedInUser) {
      throw errorHandler.notFound('user');
    }
    const theCart = await Cart.findById(signedInUser.cart);
    if (!theCart) {
      throw errorHandler.notFound('cart');
    }

    res.status(200).json(theCart);
  } catch (err) {
    next(err);
  }
};

exports.getMyCartLength = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = tokenDecoder.getUserIdFromToken(req);
    const signedInUser = await User.findById(userId);
    if (!signedInUser) {
      throw errorHandler.notFound('user');
    }
    const theCart = await Cart.findById(signedInUser.cart);
    if (!theCart) {
      throw errorHandler.notFound('cart');
    }
    let cardItemsNumber = 0;
    for (let item of theCart.items) {
      cardItemsNumber += Number(item.quantity);
    }
    return res.status(200).json(cardItemsNumber);
  } catch (err) {
    next(err);
  }
};
//i guess i have to loop in the received body and ASSIGN its items to the existed Card
exports.modifyMyCard = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = tokenDecoder.getUserIdFromToken(req);
    const receivedBody = req.body;
    const signedInUser = await User.findById(userId);
    if (!signedInUser) {
      throw errorHandler.notFound('user');
    }
    let oldCard = await Cart.findById(signedInUser.cart);
    if (!oldCard) {
      throw errorHandler.notFound('cart');
    }

    oldCard.items = [...receivedBody.items];
    let total = 0;
    for (let item of oldCard.items) {
      let theItem = await Item.findById(item.itemId);
      if (!theItem) {
        throw errorHandler.notFound('item');
      }
      total += +theItem.price * +item.quantity;
    }
    oldCard.total = total;
    const themodifiedCard = await oldCard.save();
    res.status(200).json(themodifiedCard);
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const itemId = req.params.itemId;
    const userId = tokenDecoder.getUserIdFromToken(req);
    let itemToDeleteQuanity;
    const signedInUser = await User.findById(userId);
    if (!signedInUser) {
      throw errorHandler.notFound('user');
    }
    let theCart = await Cart.findById(signedInUser.cart);
    if (!theCart) {
      throw errorHandler.notFound('cart');
    }
    const itemToDeleteInCart = theCart.items.find(
      (i: any) => i.itemId == itemId
    );
    if (!itemToDeleteInCart) {
      throw errorHandler.notFound('item');
    }
    itemToDeleteQuanity = itemToDeleteInCart.quantity;
    const theItemToDelete = await Item.findById(itemId);

    if (!theItemToDelete) {
      throw errorHandler.notFound('item');
    }
    let theUpdatedCartItems = theCart.items.filter(
      (i: any) => i.itemId != itemId
    );

    theCart.items = [...theUpdatedCartItems];
    theCart.total = theCart.total - theItemToDelete.price * itemToDeleteQuanity;
    if (theCart.total < 0) {
      theCart.total = 0;
      // throw errorHandler.badRequest();
    }
    const savedCard = await theCart.save();
    res.status(200).json(savedCard);
  } catch (err) {
    next(err);
  }
};

// async function getTotal(items: AddToCart[]): Promise<Number> {
//   let total = 0;
//   for (let item of items) {
//     const theItem = await Item.findById(item.itemId);
//     if (!theItem) {
//       throw errorHandler.notFound('item');
//     }
//     total += theItem.price * item.quantity;
//   }
//   return total;
// }
