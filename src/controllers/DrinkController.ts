const drinkSchema = require('../../dist/collections/drink.js');
import mongoose from 'mongoose';
import AbstractController from './AbstractController';

class DrinkController extends AbstractController<
  mongoose.Model<mongoose.Document<any, any>, {}, {}>
> {
  getRepository(): mongoose.Model<mongoose.Document<'Drink', any>, {}, {}> {
    console.log('appetizer repo');
    return drinkSchema;
  }
}
export default DrinkController;
