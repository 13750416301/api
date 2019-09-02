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

function Result({code = 0, msg = '200', data = {}}) {
  this.code = code;
  this.msg = msg; 
  this.data = data;
};

router.post('/', function(req, res, next) {
  //得到文件路径  
	var title = req.body.title;
	var text = req.body.text;
	var area = req.body.area;
	var src1 = req.body.src1;
	var src2 = req.body.src2;
	var src3 = req.body.src3;
	var src4 = req.body.src4;
	var src5 = req.body.src5;
	var src6 = req.body.src6;
	var authorId = req.body.authorId;
	var authorName = req.body.authorName;
	var authorImg = req.body.authorImg;
	var sql = 'insert into images (title,text,area,src1,src2,src3,src4,src5,src6,authorId,authorName,authorImg) values("' + title + '","' + text + '","' + area + '","' + src1 + '","' + src2 + '","' + src3 + '","' + src4 + '","' + src5 + '","' + src6 + '","' + authorId + '","' + authorName + '","' + authorImg + '")';
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