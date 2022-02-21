const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    List.create(req.body.list)
      .then(list => {
        req.list = list;
        next();
      })
      .catch(err => next(new HttpError("Creating list failed, please try again", 500)));
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const updateList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    List.findByIdAndUpdate(req.params.id, req.body.list, {new: true})
      .then(list => res.json({ list }))
      .catch(err => next(new HttpError("Updating list failed, please try again", 500)));
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
}

const addCardToList = (req, res, next) => {
  List.findById(req.card.listId)
  .then(list => {
    list.cards.push(req.card._id)
    list.save()
    res.json({ card: req.card })
  })
}

exports.createList = createList;
exports.updateList = updateList;
exports.addCardToList = addCardToList;
