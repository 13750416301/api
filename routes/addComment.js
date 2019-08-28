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

  var addComment = multer({storage});

router.post('/',addComment.single(), function(req, res, next) {
  //获取评论内容
  var comm=req.body.comment;
  //获取时间
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var time =year+"年"+month+"月"+day+"日"+hour+":"+minute+":"+second;
  var data={
    comment:comm,
    commentTime:time
  }
  res.json(data);
  var sql ='insert into comment (msg,time) values("' + comm+ '","'+time+'")';
  connect.query(sql,function (err, rows, fields) {
      if(err){
            console.log('INSERT ERROR - ', err.message);
            return;
        }
        console.log("INSERT SUCCESS");
            });

   });
   
module.exports = router; 