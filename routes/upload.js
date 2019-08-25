var express = require('express');
var router = express.Router();
var multer  = require('multer');
var path = require('path');
// var upload = multer({ dest: 'uploads' })
var storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, 'C:/Users/FOREVERBOBO/Downloads/My Documents/二级项目3/api/uploads');
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