const server = require('../models.js');
const Sequelize = require('sequelize');

const RecruitNotice = server.define('svRecruitNotice' , {
    //지역코드
  regionCode : {
    type : Sequelize.STRING(2),
    allowNull : false,
    primaryKey : true
  },
  //공고번호
  noticeNumber : {
    type : Sequelize.STRING(12),
    allowNull : false,
    primaryKey : true
  },
  //공고명
  noticeName : {
    type : Sequelize.STRING(500),
    allowNull : false
  },
  //공고 시작일시
  noticeStartDatetime : {
    type : Sequelize.STRING(200)
  },
  //공고 종료일시
  noticeEndDatetime : {
    type : Sequelize.STRING(200)
  },
  //교육 시작일자
  studyStartDate : {
    type : Sequelize.STRING(200)
  },
  //교육 종료일자
  studyEndDate : {
    type : Sequelize.STRING(200)
  },
  //인턴십 시작일자
  internStartDate : {
    type : Sequelize.STRING(200)
  },
  //인턴십 종료일자
  internEndDate : {
    type : Sequelize.STRING(200)
  },
  anounceDatetime : {
    type : Sequelize.STRING(200)
  },
  //공고상태
  noticeStatus : {
    type : Sequelize.STRING(1),
    allowNull : false,
    defaultValue : 'B'
  },
  //공고이미지경로
  noticeImagePath : {
    type : Sequelize.STRING(500)
  },
  //생성날짜
  createDatetime : {
    type : Sequelize.DATE,
    defaultValue : Sequelize.NOW
  },
  //생성자아이디
  createUserId : {
    type : Sequelize.STRING(300)
  },
  //수정날짜
  updateDatetime : {
    type :  Sequelize.DATE,
    defaultValue : Sequelize.NOW
  },
  //수정자아이디
  updateUserId : {
    type : Sequelize.STRING(300)
  }
}, {underscored:true});


module.exports = {
    RecruitNotice : RecruitNotice
}
