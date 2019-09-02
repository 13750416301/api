var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var cmd = require('node-cmd')
// var session = require('express-session');

router.get('/', (req, res) => {
  res.json({user: req.session.username})
  console.log(req.session.username)
  console.log(req.session)
});

module.exports = router;