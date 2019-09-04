var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// var upload = multer({ dest: 'uploads' })
var cmd = require('node-cmd');

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

router.post('/', function(req, res, next) {
  //得到文件路径    
  var title = req.body.title;
  var area = req.body.area;
  var category = req.body.area;
  var src = req.body.src;
  var authorId = req.body.authorId;
  var authorName = req.body.authorName;
  var authorImg = req.body.authorImg;
  // var src0 = src.split('.').join('0.');
  var src0 = src.replace('mp4', 'jpg');
  var src1 = src.split('.').join('1.');
  var src2 = src.split('.').join('2.');
  var src3 = src.split('.').join('3.');
	// var sql = 'insert into video (title,area,category,src1,src2,src3,authorId,authorName,authorImg) values("' + title + '","' + area + '","' + category + '","' + src1 + '","' + src2 + '","' + src3 + '","' + authorId + '","' + authorName + '","' + authorImg + '")';
  var sql = 'insert into video (title,area,category,src1,src2,src3,img,authorId,authorName,authorImg) values("' + title + '","' + area + '","' + category + '","' + src + '","' + src + '","' + src + '","' + src0 + '","' + authorId + '","' + authorName + '","' + authorImg + '")';
  connect.query(sql, (err) => {
		console.log('Insert success!');
		console.log(sql)
		res.json(
			new Result({
				data: {
					message: '上传成功！'
				}
			})
		)
	})
});
  
  
module.exports = router;