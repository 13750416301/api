var express = require('express');
var mysql = require('mysql')
var router = express.Router();
var option = {
  // host: 'localhost',
  host: '119.23.46.237',
  user: 'root',
  password: 'admin',
  port: '3306',
  database: 'mysql',
  connectTimeout: 5000
}

var connect = mysql.createConnection(option);
function Result({code = 0, msg = '200', data = {}}) {
  this.code = code;
  this.msg = msg;
  this.data = data;
};

router.get('/', (req, res) => {
  connect.query('SELECT * FROM student', (e, r) => res.json(new Result({
    data: r
  })))
})

module.exports = router;