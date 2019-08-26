var express = require('express');
var mysql = require('mysql');
var router = express.Router();
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
function Result({code = 0, msg = '200', data = {anime: null, game: null, life: null}}) {
  this.code = code;
  this.msg = msg;
  this.data = data;
};

router.get('/', (req, res) => {
    connect.query('SELECT * FROM video where area="动漫" limit 0,6 ;SELECT * FROM video where area="游戏" limit 0,6 ;SELECT * FROM video where area="生活" limit 0,6', (err, result) => res.json(new Result({
      data: {
        anime: result[0],
        game: result[1],
        life: result[2]
      }
    })))
  })

module.exports = router; 