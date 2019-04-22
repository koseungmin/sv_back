const models = require('../../model/companyRecruit/CompanyRecruit');
const systemMessage = require('../../../config/systemMessage');
require('date-utils');

exports.index = (req,res) => {
    models.CompanyRecruit.findAll()
    .then(companyRecruit => res.json(companyRecruit))
    .catch(function (err) {
        res.status(500).json(err)
    });
};
