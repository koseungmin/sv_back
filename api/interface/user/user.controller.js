const models = require('../../model/user/User');
const systemMessage = require('../../../config/systemMessage');
require('date-utils');

exports.index = (req,res) => {
    models.User.findAll()
    .then(users => res.json(users))
    .catch(function (err) {
        res.status(500).json(err)
    });
};

exports.show = (req,res) => {
  const regionCode = req.params.regionCode || '';
  const userId = req.params.userId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!userId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userId" , req:userId});
  }

  models.User.findOne({
    where: {
      regionCode: regionCode,
      userId: userId,
    }
  }).then(user => {
      if (!user){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(user);
    }).catch(function (err) {
        res.status(500).json(err)
    });
};


exports.destroy = (req, res) => {
  const regionCode = req.params.regionCode || '';
  const userId = req.params.userId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!userId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userId" , req:userId});
  }

  models.User.findOne({
    where: {regionCode: regionCode, userId:userId}
  }).then((user)=>{
    if(user == null){
      res.status(404).json(systemMessage.search.targetMissing);
    }else{
      models.User.destroy({
        where: {
          regionCode: regionCode,
          userId: userId,
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
  const userId = req.body.userId || '';
  const userType = req.body.userType || '';
  const companyId = req.body.companyId || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!userId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userId" , req:userId});
  }

  if(!userType.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userType" , req:userType});
  }

  models.User.create({
      regionCode: regionCode,
      userId: userId,
      userType: userType,
      companyId: companyId,
      createUserId: createUserId,
      updateUserId: updateUserId
  }).then((user) => res.status(201).json(user))
  .catch(function (err) {
      res.status(500).json(err)
  });
};

exports.update = (req,res) => {
  const regionCode = req.params.regionCode || '';
  const userId = req.params.userId || '';

  const userType = req.body.userType || '';
  const companyId = req.body.companyId || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

  if(!regionCode.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "regionCode" , req:regionCode});
  }

  if(!userId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userId" , req:userId});
  }

  if(!userType.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userType" , req:userType});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.User.update({
    userType: userType,
    companyId: companyId,
    createUserId: createUserId,
    updateUserId: updateUserId,
    updateDatetime: time
  } , {
       where: {regionCode: regionCode, userId:userId}
  }).then(()=>{
      return models.User.findOne({
        where: {regionCode: regionCode, userId:userId}
     });
    }).then((user) => {
     if(user == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(user)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};
