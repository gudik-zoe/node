import express, { json } from 'express';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { AbstractMenu } from '../models/abstractMenu';
import { Category } from '../models/category';
const itemSchema = require('../collections/item');
const errorHandler = require('../utility/errorHandler');

exports.getItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const limit: number = Number(req.query.limit) || 4;
    const start: number = Number(req.query.start) || 1;
    const category = req.params.category;
    console.log(category);
    const total: Number = await itemSchema
      .find({ category: category })
      .countDocuments();
    const result = await itemSchema
      .find({ category: category })
      .skip(start - 1)
      .limit(limit);
    if (!result) {
      throw errorHandler.notFound();
    }
    return res.status(200).json({ total, start, limit, result });
  } catch (err) {
    next(err);
  }
};

exports.getItemById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const category = req.params.category;
    if (!isValidObjectId(req.params.id)) {
      throw errorHandler.badRequest('invalid id');
    }
    const abstractMenu = await itemSchema.findById(req.params.id);
    if (!abstractMenu) {
      throw errorHandler.notFound(category);
    }
    return res.status(200).json(abstractMenu);
  } catch (err) {
    next(err);
  }
};

exports.createItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (errorHandler.checkForError(req) != null) {
      throw errorHandler.checkForError(req);
    }
    let menuBody: AbstractMenu = req.body;
    if (
      menuBody.category !== Category.MENU &&
      menuBody.category !== Category.APPETIZER &&
      menuBody.category !== Category.DRINK &&
      menuBody.category !== Category.DESSERT
    ) {
      throw errorHandler.badRequest();
    }
    //   menuBody.category = this.getRepository().modelName;
    //   const abstractMenu = this.getRepository();
    const abstractEntityToSave = new itemSchema(menuBody);
    const savedAbstractEntity = await abstractEntityToSave.save();
    res.status(201).json(savedAbstractEntity);
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const receivedBody: AbstractMenu = req.body;
    if (errorHandler.checkForError(req) != null) {
      throw errorHandler.checkForError(req);
    }
    if (!isValidObjectId(receivedBody._id)) {
      throw errorHandler.badRequest('invalid id');
    }
    console.log(receivedBody);
    let theOldEntity: any = await itemSchema.findById(receivedBody._id);
    if (!theOldEntity) {
      throw errorHandler.notFound();
    }
    theOldEntity.title = receivedBody.title;
    theOldEntity.description = receivedBody.description;
    theOldEntity.price = receivedBody.price;
    theOldEntity.ingredients = [...receivedBody.ingredients];
    theOldEntity.imageUrl = receivedBody.imageUrl;

    const newMenu = await theOldEntity.save();
    return res.status(200).json(newMenu);
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
    console.log(req.params.id);
    if (!isValidObjectId(req.params.id)) {
      errorHandler.badRequesr('invalid id');
    }
    const deletedMenu = await itemSchema.findByIdAndRemove(req.params.id);
    if (!deletedMenu) {
      throw errorHandler.notFound();
    }
    res.status(200).json({
      message: `item deleted successfully `,
    });
  } catch (err) {
    next(err);
  }
};
