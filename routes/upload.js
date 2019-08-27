var express = require('express');
var router = express.Router();
var multer  = require('multer');//multer 是express官方推荐的文件上传中间件
var path = require('path');
// var upload = multer({ dest: 'uploads' })
var storage = multer.diskStorage({
  destination: function(req, res, cb) {
    //cb(null, 'C:/Users/FOREVERBOBO/Downloads/My Documents/二级项目3/api/uploads');
    //cb(null,'D:/test1/destination');
    cb(null,'C:/Program Files/Apache Software Foundation/Tomcat 8.5/webapps/ROOT/videoWebSite/image');
  },
  filename: function(req, file, cb) {
    var filenameArr = file.originalname.split('.')
    cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
  }
});
var upload = multer({storage});

router.post('/', upload.single("image"), function(req, res, next) {
  //得到文件路径
  res.send(req.file);
});

module.exports = router;