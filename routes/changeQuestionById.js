var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var option = {
  // host: 'localhost',
  host: '119.23.46.237',
  user: 'root',
  password: 'admin',
  port: '3306',
  database: 'onlineexam',
  connectTimeout: 5000,
  multipleStatements: true //支持执行多条sql语句
}

var connect = mysql.createConnection(option);
function Result({code = 0, msg = '200', data = {}}) {
  this.code = code;
  this.msg = msg;
  this.data = data;
};

router.post('/', (req, res) => {
  // var id = req.body.id;
  var sql = 'UPDATE question set subjectId=' + req.body.subjectId + ',description="' + req.body.description + '",type="' + req.body.type + '",score=' + req.body.score + ',answer="' + req.body.answer + '",optionA="' + req.body.optionA + '",optionB="' + req.body.optionB + '",optionC="' + req.body.optionC + '",optionD="' + req.body.optionD + '"' + ' WHERE questionId=' + req.body.questionId + ';';
  // console.log(sql);
  connect.query(sql, (err, result) => res.json(new Result({
    data: result,
	msg: '修改成功'
  })))
})

module.exports = router;