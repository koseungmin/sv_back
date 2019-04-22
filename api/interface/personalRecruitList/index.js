const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./personalRecruitList.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/detail/:noticeNumber/:applyUserId', controller.detail);
router.get('/:applyUserId', controller.index);


module.exports = router;
