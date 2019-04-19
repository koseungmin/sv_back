const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./user.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', controller.index);

router.get('/:regionCode/:userId' , controller.show);

router.delete('/:regionCode/:userId' , controller.destroy);

router.post('/' , controller.create);

router.put('/:regionCode/:userId' , controller.update);

module.exports = router;
