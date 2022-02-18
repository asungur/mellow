const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then(card => res.json({ card }))
    .catch(err => next(new HttpError("Card not found", 404)))
}

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log(req.body.card)
    Card.create(req.body.card)
      .then(card => {
        List.findById(card.listId)
          .then(list => {
            list.cards.push(card._id)
            list.save()
            res.json({ card })
          })
      })
      .catch(err => {
        console.log(err);
        next(new HttpError("Creating card failed, please try again", 500))
      });
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const updateCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Card.findByIdAndUpdate(req.params.id, req.body.card, { new: true })
      .then(card => res.json({ card }))
      .catch(err => next(new HttpError("Updating card failed, please try again", 500)));
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
}

exports.createCard = createCard;
exports.getCard = getCard;
exports.updateCard = updateCard;
