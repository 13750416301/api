var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

// 定义请求的路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imgUploadRouter = require('./routes/upload');
var student = require('./routes/student');
var getHomePage = require('./routes/getHomePage');
var getVideoList = require('./routes/getVideoList');
var getArticleList = require('./routes/getArticleList');
var getImageList = require('./routes/getImageList');
var getImageListByArea = require('./routes/getImageListByArea');
var getVideoListByArea = require('./routes/getVideoListByArea');
//var getVideoById = require('routes/getVideoById');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.engine('html', require('art-template'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads/',express.static(path.join(__dirname, 'uploads')));

// 使用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', imgUploadRouter);
app.use('/student', student);
app.use('/getHomePage', getHomePage);
app.use('/getVideoList', getVideoList);
app.use('/getArticleList', getArticleList);
app.use('/getImageList', getImageList);
app.use('/getImageListByArea', getImageListByArea);
app.use('/getVideoListByArea', getVideoListByArea);
//app.use('/getVideoById',getVideoById);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// 解决跨域问题
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
 
  if (req.method == 'OPTIONS') {
    res.send(200); //让options请求快速返回
  }
  else {
    next();
  }
});

module.exports = app;
