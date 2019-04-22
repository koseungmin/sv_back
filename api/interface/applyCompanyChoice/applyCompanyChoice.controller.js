const models = require('../../model/applyCompanyChoice/ApplyCompanyChoice');
const systemMessage = require('../../../config/systemMessage');
require('date-utils');

exports.index = (req,res) => {
    models.ApplyCompanyChoice.findAll()
    .then(faqs => res.json(faqs))
    .catch(function (err) {
        res.status(500).json(err)
    });
};
