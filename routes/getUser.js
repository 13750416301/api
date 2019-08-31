var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var session = require('express-session');

router.get('/', (req, res) => {
  res.json({user: req.session.username})
});