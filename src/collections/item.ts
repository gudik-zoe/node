import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [{ type: String }],
    required: true,
  },
});

module.exports = mongoose.model('Item', itemSchema);
