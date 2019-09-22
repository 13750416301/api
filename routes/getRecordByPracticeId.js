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

router.get('/', (req, res) => {
  var practiceId = req.query.practiceId
  var sql = 'select * from records INNER join question on records.questionId = question.questionId WHERE practiceId =' + practiceId + ';'
  console.log(sql);
  connect.query(sql, (err, result) => res.json(new Result({
    data: result
  })))
})

module.exports = router;