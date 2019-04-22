const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./apply.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', controller.index);

router.get('/userCheck/:regionCode/:noticeNumber/:applyUserId' , controller.userCheck);

router.put('/coverLetter/:regionCode/:noticeNumber/:applyUserId' , controller.resumeUpdate);

router.get('/:regionCode/:noticeNumber/:applyUserId' , controller.show);

router.delete('/:regionCode/:noticeNumber/:applyUserId' , controller.destroy);

router.post('/' , controller.create);

router.put('/:regionCode/:noticeNumber/:applyUserId' , controller.update);



module.exports = router;
