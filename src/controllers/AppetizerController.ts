const appetizerSchema = require('../../dist/collections/appetizer.js');
const { validationResult } = require('express-validator');
const errorHandler = require('../utility/errorHandler');
import mongoose from 'mongoose';
import AbstractController from './AbstractController';

class AppetizerController extends AbstractController<
  mongoose.Model<mongoose.Document<any, any>, {}, {}>
> {
  getRepository(): mongoose.Model<mongoose.Document<'Appetizer', any>, {}, {}> {
    console.log('appetizer repo');
    return appetizerSchema;
  }
}
export default AppetizerController;
