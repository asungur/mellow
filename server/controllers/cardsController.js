const Card = require("../models/card");
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
    Card.create(req.body.card)
      .then(card => {
        req.card = card;
        next();
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
  console.log(req.body)
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Card.findByIdAndUpdate(req.params.id, req.body.card, { new: true })
      .then(card => res.json({ card }))
      .catch(err => next(new HttpError("Updating card failed, please try again", 500)));
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
}

const addCommentToCard = (req, res, next) => {
  Card.findById(req.comment.cardId)
  .then(card => {
    card.comments.push(req.comment._id)
    card.save()
    res.json({ comment: req.comment })
  })
  .catch(err => next(new HttpError("Adding comment failed, please try again", 500)));
}

const deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => next(new HttpError("Deleting card failed, please try again", 500)));
}

exports.createCard = createCard;
exports.getCard = getCard;
exports.updateCard = updateCard;
exports.addCommentToCard = addCommentToCard;
exports.deleteCard = deleteCard;
