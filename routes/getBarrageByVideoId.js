var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var option = {
  // host: 'localhost',
  host: '119.23.46.237',
  user: 'root',
  password: 'admin',
  port: '3306',
  database: 'video_website',
  connectTimeout: 5000,
  multipleStatements: true //支持执行多条sql语句
}

var connect = mysql.createConnection(option);
function Result({code = 0, msg = '200', data = {}}) {
  this.code = code;
  this.msg = msg;
  this.data = data;
};

router.get('/', (req, res) => {//根据videoId获取弹幕  
  var videoId = req.query.videoId;
  var query ='SELECT * FROM barrage where videoId="' + videoId + '"';
  connect.query(query, (err, result) => res.json(new Result({
    data: result[0]
  })))
})
module.exports = router; 