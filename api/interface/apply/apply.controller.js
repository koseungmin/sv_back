const models = require('../../model/apply/Apply');
const systemMessage = require('../../../config/systemMessage');

exports.index = (req,res) => {
  //추후 내가 쓴 문의사항만 보여주도록 변경 필요, 인증정보 나오면
    models.Apply.findAll()
    .then(applys => res.json(applys))
    .catch(function (err) {
        res.status(500).json(err)
    });
};


//유저 정보 존재 유무 체크, (없으면 0, 있으면 1 return)
exports.userCheck = (req,res) => {
  const regionCode = req.params.regionCode || '';
  const noticeNumber = req.params.noticeNumber || '';
  const applyUserId = req.params.applyUserId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!noticeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeNumber" , req:noticeNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  models.Apply.findOne({
    where: {
      regionCode: regionCode,
      noticeNumber: noticeNumber,
      applyUserId: applyUserId
    }
  }).then(apply => {
      if (!apply){
        return res.json({row: '0'});
      }
      return res.json({row: '1'});
    }).catch(function (err) {
        res.status(500).json(err)
    });
};

exports.show = (req,res) => {
  const regionCode = req.params.regionCode || '';
  const noticeNumber = req.params.noticeNumber || '';
  const applyUserId = req.params.applyUserId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!noticeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeNumber" , req:noticeNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  models.Apply.findOne({
    where: {
      regionCode: regionCode,
      noticeNumber: noticeNumber,
      applyUserId: applyUserId
    }
  }).then(apply => {
      if (!apply){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(apply);
    }).catch(function (err) {
        res.status(500).json(err)
    });
};


exports.destroy = (req, res) => {
  const regionCode = req.params.regionCode || '';
  const noticeNumber = req.params.noticeNumber || '';
  const applyUserId = req.params.applyUserId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!noticeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeNumber" , req:noticeNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  models.Apply.findOne({
    where: {
      regionCode: regionCode,
      noticeNumber: noticeNumber,
      applyUserId: applyUserId
    }
  }).then((apply)=>{
    if(apply == null){
      res.status(404).json(systemMessage.search.targetMissing);
    }else{
      models.Apply.destroy({
        where: {
          regionCode: regionCode,
          noticeNumber: noticeNumber,
          applyUserId: applyUserId
        }
      }).then(() => res.status(200).json(systemMessage.delete.success))
      .catch(function (err) {
            res.status(500).json(err)
      });
    }
  })
};

exports.create = (req,res) => {
  console.log(req.body)
  const regionCode = req.body.regionCode || '';
  const noticeNumber = req.body.noticeNumber || '';
  const applyUserId = req.body.applyUserId || '';
  const applyName = req.body.applyName || '';
  const applyNationality = req.body.applyNationality || '';
  const applyBirth = req.body.applyBirth || '';
  const applyGender = req.body.applyGender || '';
  const applyPhone = req.body.applyPhone || '';
  const applyAddress = req.body.applyAddress || '';
  const disabilityYn = req.body.disabilityYn || '';
  const militaryYn = req.body.militaryYn || '';
  const veteransYn = req.body.veteransYn || '';
  const applyStatus = req.body.applyStatus || '';
  const coverLetter = req.body.coverLetter || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!noticeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeNumber" , req:noticeNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  models.Apply.create({
    regionCode: regionCode,
    noticeNumber: noticeNumber,
    applyUserId: applyUserId,
    applyName: applyName,
    applyNationality: applyNationality,
    applyBirth: applyBirth,
    applyGender: applyGender,
    applyPhone: applyPhone,
    applyAddress: applyAddress,
    disabilityYn: disabilityYn,
    militaryYn: militaryYn,
    veteransYn: veteransYn,
    applyStatus: applyStatus,
    coverLetter: coverLetter,
    createUserId: createUserId,
    updateUserId: updateUserId
  }).then((apply) => res.status(201).json(apply))
  .catch(function (err) {
      res.status(500).json(err)
  });
};

exports.update = (req,res) => {
  const regionCode = req.params.regionCode || '';
  const noticeNumber = req.params.noticeNumber || '';
  const applyUserId = req.params.applyUserId || '';

  const applyName = req.body.applyName || '';
  const applyNationality = req.body.applyNationality || '';
  const applyBirth = req.body.applyBirth || '';
  const applyGender = req.body.applyGender || '';
  const applyPhone = req.body.applyPhone || '';
  const applyAddress = req.body.applyAddress || '';
  const disabilityYn = req.body.disabilityYn || '';
  const militaryYn = req.body.militaryYn || '';
  const veteransYn = req.body.veteransYn || '';
  const applyStatus = req.body.applyStatus || '';
  const coverLetter = req.body.coverLetter || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!noticeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeNumber" , req:noticeNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.Apply.update({
    applyName: applyName,
    applyNationality: applyNationality,
    applyBirth: applyBirth,
    applyGender: applyGender,
    applyPhone: applyPhone,
    applyAddress: applyAddress,
    disabilityYn: disabilityYn,
    militaryYn: militaryYn,
    veteransYn: veteransYn,
    applyStatus: applyStatus,
    coverLetter: coverLetter,
    createUserId: createUserId,
    updateUserId: updateUserId,
    updateDatetime: time
  } , {
    where: {
      regionCode: regionCode,
      noticeNumber: noticeNumber,
      applyUserId: applyUserId
    }
  }).then(()=>{
      return models.Apply.findOne({
        where: {
          regionCode: regionCode,
          noticeNumber: noticeNumber,
          applyUserId: applyUserId
        }
     });
   }).then((apply) => {
     if(apply == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(apply)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};

exports.resumeUpdate = (req,res) => {
  const regionCode = req.params.regionCode || '';
  const noticeNumber = req.params.noticeNumber || '';
  const applyUserId = req.params.applyUserId || '';

  const coverLetter = req.body.coverLetter;

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!noticeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeNumber" , req:noticeNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.Apply.update({
    coverLetter: coverLetter,
    updateDatetime: time
  } , {
    where: {
      regionCode: regionCode,
      noticeNumber: noticeNumber,
      applyUserId: applyUserId
    }
  }).then(()=>{
      return models.Apply.findOne({
        where: {
          regionCode: regionCode,
          noticeNumber: noticeNumber,
          applyUserId: applyUserId
        }
     });
   }).then((apply) => {
     if(apply == null) {
       res.status(404).json(systemMessage.delete.targetMissing)
     }else{
       res.status(200).json(apply)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};
