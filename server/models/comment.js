const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
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
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
    required: [true, 'The Card ID is required']
  },
  content: {
    type: String,
    required: [true, 'Comment content is required']
  }
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;