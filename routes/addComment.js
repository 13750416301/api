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

router.post('/',addComment.single("comment"), function(req, res, next) {
  res.json(req.body);
   });
   
module.exports = router; 