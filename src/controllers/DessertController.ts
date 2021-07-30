const dessertSchema = require('../../dist/collections/dessert.js');
import mongoose from 'mongoose';
import AbstractController from './AbstractController';

class DessertController extends AbstractController<
  mongoose.Model<mongoose.Document<any, any>, {}, {}>
> {
  getRepository(): mongoose.Model<mongoose.Document<'Dessert', any>, {}, {}> {
    console.log('appetizer repo');
    return dessertSchema;
  }
}
export default DessertController;
