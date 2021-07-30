const menuSchema = require('../../dist/collections/menu.js');
const { MenuModel } = require('../models/menu');
const { validationResult } = require('express-validator');
const errorHandler = require('../utility/errorHandler');
import mongoose from 'mongoose';
import AbstractController from './AbstractController';

class MenuController extends AbstractController<
  mongoose.Model<mongoose.Document<any, any>, {}, {}>
> {
  getRepository(): mongoose.Model<mongoose.Document<'Menu', any>, {}, {}> {
    console.log('menu repo');
    return menuSchema;
  }
}
export default MenuController;
