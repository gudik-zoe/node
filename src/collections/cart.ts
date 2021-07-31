import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const cartSchema = new Schema({
  menus: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
  drinks: [{ type: Schema.Types.ObjectId, ref: 'Drink' }],
  appetizers: [{ type: Schema.Types.ObjectId, ref: 'Appetizer' }],
  desserts: [{ type: Schema.Types.ObjectId, ref: 'Appetizer' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Cart', cartSchema);
