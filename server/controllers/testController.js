const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");
const HttpError = require("../models/httpError");

const test = (req, res, next) => {
  /*
  Card.create({
    title: 'test title2000',
    boardId: '620d46902ca44c3f8bdb76cc',
    listId: '620d4727b3f5e9400dbf10c7',
    position: 1225.0,
    labels: [ 'corn', 'strawberries', 'iPads', 'toothpicks' ],
  }).then(card => {
    res.json(card);
  });
  Board.findOne({ title: 'test title' })
    .populate({ 
      path: 'lists', 
      populate: { path: 'cards' }})
    .exec((err, board) => {
      res.json({ content: board });
    });
  */
};

exports.test = test;
