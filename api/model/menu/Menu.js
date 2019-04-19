const server = require('../models.js');
const Sequelize = require('sequelize');

const Menu = server.define('svMenu' , {
    //문의순번
  id : {
    type : Sequelize.INTEGER,
    allowNull : false,
    primaryKey : true,
    autoIncrement: true
  },
  menuName : {
    type : Sequelize.STRING(50),
    allowNull : false
  },
  //문의자 전화번호
  depth : {
    type : Sequelize.INTEGER,
    allowNull : false
  },
  //문의유형
  url : {
    type : Sequelize.STRING(50)
  },
  //문의제목
  parent : {
    type : Sequelize.INTEGER
  },
  //문의내용
  show : {
    type : Sequelize.STRING(1)
  },
  //생성날짜
  ord : {
    type : Sequelize.INTEGER
  }
}, {underscored:true});


module.exports =  {
    Menu : Menu
}
