const Comment = require("../models/comment");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createComment = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Comment.create(req.body.comment)
      .then(comment => {
        req.comment = comment;
        next();
      })
      .catch(err => {
        console.log(err)
        next(new HttpError("Creating comment failed, please try again", 500))
      })
  } else {
    return next(new HttpError("The content field is empty.", 404));
  }
}

exports.createComment = createComment;