const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const testController = require("../controllers/testController");
const cardsController = require("../controllers/cardsController");
const { validateList, validateBoard, validateCard } = require("../validators/validators");


router.get('/boards', boardsController.getBoards);

router.post('/boards', validateBoard, boardsController.createBoard);

router.get('/boards/:id', boardsController.getBoard);

router.get('/test', testController.test);

router.post('/lists', validateList, listsController.createList);
router.put('/lists/:id', validateList, listsController.updateList);

router.get('/cards/:id', cardsController.getCard);
router.post('/cards', validateCard, cardsController.createCard);
router.put('/cards/:id', validateCard, cardsController.updateCard);

module.exports = router;
