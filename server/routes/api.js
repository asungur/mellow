const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const testController = require("../controllers/testController");
const { validateList, validateBoard } = require("../validators/validators");


router.get('/boards', boardsController.getBoards);

router.post('/boards', validateBoard, boardsController.createBoard);

router.get('/boards/:id', boardsController.getBoard);

router.get('/test', testController.test);

router.post('/lists', validateList, listsController.createList);

router.put('/lists/:id', validateList, listsController.updateList);

module.exports = router;
