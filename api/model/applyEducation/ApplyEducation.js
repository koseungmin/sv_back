const server = require('../models.js');
const Sequelize = require('sequelize');

const ApplyEducation = server.define('svApplyEducation' , {
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
  //지원자 아이디
  applyUserId : {
    type : Sequelize.STRING(300),
    allowNull : false,
    primaryKey : true
  },
  //학력정보순번
  educationSeq : {
    type : Sequelize.INTEGER,
    allowNull : false
  },
  //학력
  degree : {
    type : Sequelize.STRING(2)
  },
  //졸업상태
  graduStatus : {
    type : Sequelize.STRING(2)
  },
  //입학날짜
  enterDateInfo : {
    type : Sequelize.STRING(10)
  },
  //졸업날짜
  graduDateInfo : {
    type : Sequelize.STRING(10)
  },
  //학교명
  schoolName : {
    type : Sequelize.STRING(300)
  },
  //전공
  major : {
    type : Sequelize.STRING(300)
  },
  //부전공
  minor : {
    type : Sequelize.STRING(300)
  },
  //복수전공
  doubleMajor : {
    type : Sequelize.STRING(300)
  },
  //학점
  grade : {
    type : Sequelize.STRING(10)
  },
  //만점학점
  perfectGrade : {
    type : Sequelize.STRING(10)
  },
  //편입여부
  transferYn : {
    type : Sequelize.STRING(1)
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


module.exports =  {
    ApplyEducation : ApplyEducation
}
