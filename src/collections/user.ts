import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
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
    required: false,
  },
  gender: {
    type: String,
    required: false,
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
  // posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('User', userSchema);
