const List = require("../models/list");
const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    List.create(req.body.list)
      .then(list => {
        Board.findById(list.boardId)
          .then(board => {
            board.lists.push(list._id)
            board.save()
            res.json({ list })
          })
        })
      .catch(err => next(new HttpError("Creating list failed, please try again", 500)));
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const updateList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    List.findByIdAndUpdate(req.params.id, req.body.list)
      .then(list => {
        List.find({ _id: list._id }, "title _id position boardId createdAt updatedAt")
          .then(list => res.json({ list }))
      })
      .catch(err => next(new HttpError("Updating list failed, please try again", 500)));
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
}

exports.createList = createList;
exports.updateList = updateList;
