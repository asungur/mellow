const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        board = {
          title: board.title,
          _id: board._id,
          createdAt: board.createdAt,
          updatedAt: board.updatedAt
        }
        res.json({ board });
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const getBoard = (req, res, next) => {
  const id = req.params.id;
  Board.findById(id)
    .populate({ 
      path: 'lists', 
      populate: { path: 'cards' }})
    .exec((err, board) => {
      if (!board) {
        next(new HttpError("Invalid board id provided", 404));
      }
      res.json(board);
    });
};

const addListToBoard = (req, res, next) => {
  Board.findById(req.list.boardId)
    .then(board => {
      board.lists.push(req.list._id)
      board.save()
      res.json({ list: req.list})
    })
}

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.addListToBoard = addListToBoard;
