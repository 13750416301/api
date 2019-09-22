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
  var questionId = req.body.questionId;
  var userId = req.body.userId;
  var userAnswer = req.body.userAnswer;
  var answer = req.body.answer;
  var score = req.body.score;
  var practiceId = req.body.practiceId;
  var sql = 'insert into records (questionId, userId, userAnswer, answer, score, practiceId) values (' + questionId + ',' + userId + ',"' + userAnswer + '","' + answer + '",' + score + ',' + practiceId + ')';
  console.log(sql);
  connect.query(sql, (err, result) => res.json(new Result({
    data: result,
	msg: '修改成功'
  })))
})

module.exports = router;