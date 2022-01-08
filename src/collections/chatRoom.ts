import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const chatRoomSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [
    {
      text: { type: String, required: true },
      type: { type: String, required: true },
      date: { type: Date, default: new Date(), required: true }
    }
  ]

  ,
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
