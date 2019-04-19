const models = require('../../model/recruitNotice/RecruitNotice');
const querySequelize = require('../../model/models.js');
const systemMessage = require('../../../config/systemMessage');

exports.index = (req,res) => {
  models.RecruitNotice.findAll()
  .then(recruitNotices => res.json(recruitNotices))
  .catch(function (err) {
      res.status(500).json(err)
  });
};

exports.show = (req,res) => {
  const regionCode = req.params.regionCode || '';
  const noticeNumber = req.params.noticeNumber || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!noticeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeNumber" , req:noticeNumber});
  }

  models.RecruitNotice.findOne({
    where: {
      regionCode: regionCode,
      noticeNumber: noticeNumber
    }
  }).then(recruitNotice => {
      if (!recruitNotice){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(recruitNotice);
    }).catch(function (err) {
        res.status(500).json(err)
    });
  };

exports.personalRecruitList = (req,res) => {
  const regionCode = req.params.regionCode || '';
  const noticeNumber = req.params.noticeNumber || '';
  const applyUserId = req.params.applyUserId || '';
  const query = "SELECT " +
                  "notice.notice_name as noticeName, " +
                  "notice.notice_start_datetime as noticeStartDatetime, " +
                  "notice.notice_end_datetime as noticeEndDatetime, " +
                  "notice.anounce_datetime as anounceDatetime, " +
                  "notice.notice_status as noticeStatus " +
                  "FROM " +
                  "SV_APPLIES apply ,SV_RECRUIT_NOTICES notice " +
                  "WHERE apply.region_code = notice.region_code " +
                  "and apply.notice_number = notice.notice_number " +
                  "and apply.apply_user_id =:apply_user_id " +
                  "and apply.region_code =:region_code " +
                  "and apply.notice_number =:notice_number "

  return querySequelize.query(query, {
    raw: true,
    replacements:{
      region_code : regionCode,
      notice_number : noticeNumber,
      apply_user_id : applyUserId
    }
  }).spread(function(results){
    console.log(results);
    return res.json(results);
  }).catch(function (err) {
      res.status(500).json(err)
  });
};

exports.destroy = (req, res) => {
  const regionCode = req.params.regionCode || '';
  const noticeNumber = req.params.noticeNumber || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!noticeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeNumber" , req:noticeNumber});
  }

  models.RecruitNotice.findOne({
    where: {
      regionCode: regionCode,
      noticeNumber: noticeNumber
    }
  }).then((recruitNotice)=>{
    if(recruitNotice == null){
      res.status(404).json(systemMessage.search.targetMissing);
    }else{
      models.RecruitNotice.destroy({
        where: {
          regionCode: regionCode,
          noticeNumber: noticeNumber
        }
      }).then(() => res.status(200).json(systemMessage.delete.success))
      .catch(function (err) {
            res.status(500).json(err)
      });
    }
  })
};

exports.create = (req,res) => {
  const regionCode = req.body.regionCode || '';
  const noticeNumber = req.body.noticeNumber || '';
  const noticeName = req.body.noticeName || '';
  const noticeStartDatetime = req.body.noticeStartDatetime || '';
  const noticeEndDatetime = req.body.noticeEndDatetime || '';
  const studyStartDate = req.body.studyStartDate || '';
  const studyEndDate = req.body.studyEndDate || '';
  const internStartDate = req.body.internStartDate || '';
  const internEndDate = req.body.internEndDate || '';
  const noticeStatus = req.body.noticeStatus || '';
  const noticeImagePath = req.body.noticeImagePath || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!noticeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeNumber" , req:noticeNumber});
  }

  if(!noticeName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeName" , req:noticeName});
  }

  if(!noticeStartDatetime.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStartDatetime" , req:noticeStartDatetime});
  }

  if(!noticeEndDatetime.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeEndDatetime" , req:noticeEndDatetime});
  }

  if(!noticeStatus.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStatus" , req:noticeStatus});
  }

  models.RecruitNotice.create({
    regionCode : regionCode,
    noticeNumber : noticeNumber,
    noticeName : noticeName,
    noticeStartDatetime : noticeStartDatetime,
    noticeEndDatetime : noticeEndDatetime,
    studyStartDate : studyStartDate,
    studyEndDate : studyEndDate,
    internStartDate : internStartDate,
    internEndDate : internEndDate,
    noticeStatus : noticeStatus,
    noticeImagePath : noticeImagePath,
    createUserId : createUserId,
    updateUserId : updateUserId
  }).then((recruitNotice) => res.status(201).json(recruitNotice))
  .catch(function (err) {
      res.status(500).json(err)
  });
};

exports.update = (req,res) => {
  const regionCode = req.params.regionCode || '';
  const noticeNumber = req.params.noticeNumber || '';

  const noticeName = req.body.noticeName || '';
  const noticeStartDatetime = req.body.noticeStartDatetime || '';
  const noticeEndDatetime = req.body.noticeEndDatetime || '';
  const studyStartDate = req.body.studyStartDate || '';
  const studyEndDate = req.body.studyEndDate || '';
  const internStartDate = req.body.internStartDate || '';
  const internEndDate = req.body.internEndDate || '';
  const noticeStatus = req.body.noticeStatus || '';
  const noticeImagePath = req.body.noticeImagePath || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!noticeNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeNumber" , req:noticeNumber});
  }

  if(!noticeName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeName" , req:noticeName});
  }

  if(!noticeStartDatetime.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStartDatetime" , req:noticeStartDatetime});
  }

  if(!noticeEndDatetime.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeEndDatetime" , req:noticeEndDatetime});
  }

  if(!noticeStatus.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStatus" , req:noticeStatus});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.RecruitNotice.update({
    regionCode : regionCode,
    noticeNumber : noticeNumber,
    noticeName : noticeName,
    noticeStartDatetime : noticeStartDatetime,
    noticeEndDatetime : noticeEndDatetime,
    studyStartDate : studyStartDate,
    studyEndDate : studyEndDate,
    internStartDate : internStartDate,
    internEndDate : internEndDate,
    noticeStatus : noticeStatus,
    noticeImagePath : noticeImagePath,
    createUserId : createUserId,
    updateUserId : updateUserId,
    updateDatetime: time
  } , {
    where: {
      regionCode: regionCode,
      noticeNumber: noticeNumber
    }
  }).then(()=>{
      return models.RecruitNotice.findOne({
        where: {
          regionCode: regionCode,
          noticeNumber: noticeNumber
        }
     });
   }).then((recruitNotice) => {
     if(recruitNotice == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(recruitNotice)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};
