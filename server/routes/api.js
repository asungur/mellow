const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const testController = require("../controllers/testController");
const { validateBoard } = require("../validators/validators");


router.get('/boards', boardsController.getBoards);

router.post('/boards', validateBoard, boardsController.createBoard);

router.get('/boards/:id', boardsController.getBoard);

router.get('/test', testController.test);

module.exports = router;
