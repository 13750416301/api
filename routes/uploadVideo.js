var express = require('express');
var router = express.Router();
var multer  = require('multer');
var mysql = require('mysql');
var path = require('path');
// var upload = multer({ dest: 'uploads' })

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
    //cb(null,'D:/test1/destination');
    cb(null,'C:/Program Files/Apache Software Foundation/Tomcat 8.5/webapps/ROOT/videoWebSite/video');
  },
  filename: function(req, file, cb) {
    var filenameArr = file.originalname.split('.')
    cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
  }
});
var upload = multer({storage});

router.post('/', upload.single("video"), function(req, res, next) {
  //得到文件路径  
  res.send(req.file);
  var title= req.file.originalname;
  var src1 = req.file.filename;
  console.log("filemessage",title);
  var sql ='insert into video (title,src1) values("' + title+ '","'+src1+'")';
  connect.query(sql,function (err, rows, fields) {
      if(err){
            console.log('INSERT ERROR - ', err.message);
            return;
        }
        console.log("INSERT SUCCESS");
});
  
});
  
  
module.exports = router;