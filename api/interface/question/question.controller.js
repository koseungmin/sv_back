const models = require('../../model/question/Question');
const systemMessage = require('../../../config/systemMessage');

exports.showByQuestion = (req,res) => {
  const questionSeq = req.params.questionSeq || '';

  if(!questionSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "questionSeq" , req:questionSeq});
  }

  models.Question.findOne({
    where: {questionSeq: questionSeq}
  }).then(question => {
      if (!question){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(question);
    }).catch(function (err) {
        res.status(500).json(err)
    });
};

exports.showByUser = (req,res) => {
  const createUserId = req.params.createUserId || '';

  if(!createUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "createUserId" , req:createUserId});
  }

  models.Question.findAll({
    where: {createUserId:createUserId}
  }).then(question => {
      if (!question){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(question);
    }).catch(function (err) {
        res.status(500).json(err)
    });
};

exports.index = (req,res) => {
  //추후 내가 쓴 문의사항만 보여주도록 변경 필요, 인증정보 나오면
    models.Question.findAll()
    .then(questions => res.json(questions))
    .catch(function (err) {
        res.status(500).json(err)
    });
};

exports.show = (req,res) => {
  const questionSeq = req.params.questionSeq || '';
  const createUserId = req.params.createUserId || '';

  if(!questionSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "questionSeq" , req:questionSeq});
  }

  if(!createUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "createUserId" , req:createUserId});
  }

  models.Question.findOne({
    where: {questionSeq: questionSeq, createUserId:createUserId}
  }).then(question => {
      if (!question){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(question);
    }).catch(function (err) {
        res.status(500).json(err)
    });
};

exports.destroy = (req, res) => {
  const questionSeq = req.params.questionSeq || '';

  if(!questionSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "questionSeq" , req:questionSeq});
  }

  models.Question.findOne({
    where: {questionSeq: questionSeq}
  }).then((question)=>{
    if(question == null){
      res.status(404).json(systemMessage.search.targetMissing);
    }else{
      models.Question.destroy({
        where: {questionSeq: questionSeq}
      }).then(() => res.status(200).json(systemMessage.delete.success))
      .catch(function (err) {
            res.status(500).json(err)
      });
    }
  })
};

exports.create = (req,res) => {
  //const questionEmail = req.body.questionEmail || '';
  //const questionPhone = req.body.questionPhone || '';
  const questionType = req.body.questionType || '';
  const questionTitle = req.body.questionTitle || '';
  const questionContent = req.body.questionContent || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

  //if(!questionEmail.length){
//    return res.status(400).json({error:'잘못된 이메일 주소입니다.' , req:questionEmail});
//  }

//  if(!questionPhone.length){
//    return res.status(400).json({error:'잘못된 핸드폰 번호입니다.' , req:questionPhone});
//  }

  models.Question.create({
    //  questionEmail: questionEmail,
    //  questionPhone: questionPhone,
      questionType: questionType,
      questionTitle: questionTitle,
      questionContent: questionContent,
      createUserId: createUserId,
      updateUserId: updateUserId
  }).then((question) => res.status(201).json(question))
  .catch(function (err) {
      res.status(500).json(err)
  });
};

exports.update = (req,res) => {
  const questionSeq = req.params.questionSeq || '';
//  const questionEmail = req.body.questionEmail || '';
//  const questionPhone = req.body.questionPhone || '';
  const questionType = req.body.questionType || '';
  const questionTitle = req.body.questionTitle || '';
  const questionContent = req.body.questionContent || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

//  if(!questionEmail.length){
//    return res.status(400).json({error:'잘못된 이메일 주소입니다.' , req:questionEmail});
//  }

//  if(!questionPhone.length){
//    return res.status(400).json({error:'잘못된 핸드폰 번호입니다.' , req:questionPhone});
//  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.Question.update({
  //  questionEmail: questionEmail,
  //  questionPhone: questionPhone,
    questionType: questionType,
    questionTitle: questionTitle,
    questionContent: questionContent,
    createUserId: createUserId,
    updateUserId: updateUserId,
    updateDatetime: time
  } , {
       where: {questionSeq: questionSeq}
  }).then(()=>{
      return models.Question.findOne({
        where: {questionSeq: questionSeq}
     });
   }).then((question) => {
     if(question == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(question)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};
