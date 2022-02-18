const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Card.create(req.body.card)
      .then(card => res.json({ card }))
      .catch(err => next(new HttpError("Creating card failed, please try again", 500)));
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

// const updateList = (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     List.findByIdAndUpdate(req.params.id, req.body.list)
//       .then(list => {
//         List.find({ _id: list._id }, "title _id position boardId createdAt updatedAt")
//           .then(list => res.json({ list }))
//       })
//       .catch(err => next(new HttpError("Updating list failed, please try again", 500)));
//   } else {
//     return next(new HttpError("The input field is empty.", 404));
//   }
// }

exports.createCard = createCard;
// exports.updateList = updateList;
