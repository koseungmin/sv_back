const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user', require('./api/interface/user'));
app.use('/question', require('./api/interface/question'));
app.use('/apply', require('./api/interface/apply'));
app.use('/faq', require('./api/interface/faq'));
//app.use('/board', require('./api/interface/board'));
app.use('/menu', require('./api/interface/menu'));
app.use('/company', require('./api/interface/company'));
app.use('/recruitNotice', require('./api/interface/recruitNotice'));
//CORS설정
app.use(cors());

module.exports = app;
