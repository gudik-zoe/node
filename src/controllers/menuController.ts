import express, { json } from 'express';
import { Menu } from '../models/menu';
const menuSchema = require('../../dist/collections/menu.js');
const { MenuModel } = require('../models/menu');
const { validationResult } = require('express-validator');
const errorHandler = require('../utility/errorHandler');

exports.createMenu = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (errorHandler.checkForError(req) != null) {
      throw errorHandler.checkForError(req);
    }
    let menuBody = req.body;
    const menu = new menuSchema(menuBody);
    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    next(err);
  }
};

exports.getMenus = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const menus: Menu[] = await menuSchema.find();
    if (!menus) {
      throw errorHandler.notFound();
    }
    return res.status(200).json(menus);
  } catch (err) {
    next(err);
  }
};
