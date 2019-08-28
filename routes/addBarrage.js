var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var multer  = require('multer');
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
var storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null,'D:/test1/destination');
    //cb(null,'C:/Program Files/Apache Software Foundation/Tomcat 8.5/webapps/ROOT/videoWebSite/image');
  }});

  var addBarrage = multer({storage});

router.post('/',addBarrage.single(), function(req, res, next) {
    //得到文件路径
    var barr=req.body.barrage;
    var data={
      barrage:barr
    }
    res.json(data);
    var sql ='insert into barrage (msg) values("' + barr+ '")';
  connect.query(sql,function (err, rows, fields) {
      if(err){
            console.log('INSERT ERROR - ', err.message);
            return;
        }
        console.log("INSERT SUCCESS");
            });
   });
   
module.exports = router; 