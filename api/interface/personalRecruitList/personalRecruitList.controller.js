const querySequelize = require('../../model/models.js');
const systemMessage = require('../../../config/systemMessage');

exports.index = (req,res) => {
  const applyUserId = req.params.applyUserId || '';

  const query = "SELECT " +
                  "apply.apply_user_id as applyUserId, " +
                  "apply.region_code as regionCode, " +
                  "apply.notice_number as noticeNumber, " +
                  "notice.notice_name as noticeName, " +
                  "notice.notice_start_datetime as noticeStartDatetime, " +
                  "notice.notice_end_datetime as noticeEndDatetime, " +
                  "notice.anounce_datetime as anounceDatetime, " +
                  "notice.notice_status as noticeStatus " +
                  "FROM " +
                  "SV_APPLIES apply ,SV_RECRUIT_NOTICES notice " +
                  "WHERE apply.region_code = notice.region_code " +
                  "and apply.notice_number = notice.notice_number " +
                  "and apply.apply_user_id =:applyUserId";

  return querySequelize.query(query, {
    type: querySequelize.QueryTypes.RAW,
    replacements: { applyUserId: applyUserId }
  }).spread(function(results){
    console.log(results);
    return res.json(results);
  }).catch(function (err) {
      res.status(500).json(err)
  });
};


exports.detail = (req,res) => {
  const applyUserId = req.params.applyUserId || '';
  const noticeNumber = req.params.noticeNumber || '';

  const query = "select '1지망' as priority, " +
  "company.company_id as companyId, " +
  "company.company_name as companyName, " +
  "recruit.recruit_job as recruitJob, " +
  "recruit.workplace as workplace, " +
  "recruit.fulltime_salary as fulltimeSalary " +
  "from sv_apply_company_choices choice, sv_companies company, sv_company_recruits recruit " +
  "where choice.first_company = company.company_id " +
  "and choice.first_company = recruit.company_id " +
  "and choice.notice_number = recruit.notice_number " +
  "and choice.apply_user_id =:applyUserId " +
  "and choice.notice_number =:noticeNumber " +
  "union all " +
  "select '2지망' as priority, " +
  "company.company_id as companyId, " +
  "company.company_name as companyName, " +
  "recruit.recruit_job as recruitJob, " +
  "recruit.workplace as workplace, " +
  "recruit.fulltime_salary as fulltimeSalary " +
  "from sv_apply_company_choices choice, sv_companies company, sv_company_recruits recruit " +
  "where choice.second_company = company.company_id " +
  "and choice.second_company = recruit.company_id " +
  "and choice.notice_number = recruit.notice_number " +
  "and choice.apply_user_id =:applyUserId " +
  "and choice.notice_number =:noticeNumber " +
  "union all " +
  "select '3지망' as priority, " +
  "company.company_id as companyId, " +
  "company.company_name as companyName, " +
  "recruit.recruit_job as recruitJob, " +
  "recruit.workplace as workplace, " +
  "recruit.fulltime_salary as fulltimeSalary " +
  "from sv_apply_company_choices choice, sv_companies company, sv_company_recruits recruit " +
  "where choice.third_company = company.company_id " +
  "and choice.third_company = recruit.company_id " +
  "and choice.notice_number = recruit.notice_number " +
  "and choice.apply_user_id =:applyUserId " +
  "and choice.notice_number =:noticeNumber ";

  return querySequelize.query(query, {
    replacements: { applyUserId: applyUserId, noticeNumber:noticeNumber},
    type: querySequelize.QueryTypes.RAW
  }).spread(function(results){
    console.log(results);
    return res.json(results);
  }).catch(function (err) {
      res.status(500).json(err)
  });
};
