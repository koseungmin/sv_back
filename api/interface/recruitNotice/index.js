const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./recruitNotice.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', controller.index);

router.get('/:regionCode/:noticeNumber' , controller.show);

router.get('/personalRecruitList/:regionCode/:noticeNumber/:applyUserId' , controller.personalRecruitList);

router.delete('/:regionCode/:noticeNumber' , controller.destroy);

router.post('/' , controller.create);

router.put('/:regionCode/:noticeNumber' , controller.update);

module.exports = router;
