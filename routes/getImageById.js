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


router.get('/', (req, res) => {//根据id获取某图片  
  var id = req.query.id;
  var query ='SELECT * FROM images where id="' + id + '"';
  connect.query(query, (err, result) => res.json( 
    result))
})
module.exports = router; 