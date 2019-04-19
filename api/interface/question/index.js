const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./question.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', controller.index);

router.get('/:questionSeq' , controller.show);

router.delete('/:questionSeq' , controller.destroy);

router.post('/' , controller.create);

router.put('/:questionSeq' , controller.update);

module.exports = router;
