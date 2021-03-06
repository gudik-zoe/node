import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
