import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: false,
  },
  temporaryPassword: {
    type: String,
    required: false,
  },
  temporaryPasswordCreationTs: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('User', userSchema);
