const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  },
  dueDate: Date,
  labels: [
    {
      color: String,
      name: String,
    }
  ],
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'The Board ID is required']
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: [true, 'The List ID is required']
  },
  position: {
    type: Number,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  commentsCount: Number,
}, {timestamps: true})


const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
