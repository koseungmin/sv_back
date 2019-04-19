const models = require('../../model/company/Company');
const systemMessage = require('../../../config/systemMessage');
require('date-utils');

exports.index = (req,res) => {
    models.Company.findAll()
    .then(faqs => res.json(faqs))
    .catch(function (err) {
        res.status(500).json(err)
    });
};

exports.show = (req,res) => {
  const companyId = req.params.companyId || '';

  if(!companyId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "companyId" , req:companyId});
  }

  models.Company.findOne({
    where: {
      companyId: companyId
    }
  }).then(company => {
      if (!company){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(company);
    }).catch(function (err) {
        res.status(500).json(err)
    });
};
