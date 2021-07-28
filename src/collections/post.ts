import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Post', postSchema);
