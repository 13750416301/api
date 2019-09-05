var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var mysql = require('mysql');
var cmd = require('node-cmd')
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
app.set('true proxy', 1)
// app.use(session({
//   secret: 'secret',
//   resave: true,
//   key: 'fdjfkd',
//   saveUninitialized: true,
//   // cookie: { secure: true }
//   cookie:{
//       maxAge: 1000 * 60 * 10, //过期时间设置(单位毫秒)
//       secure: false
//   }
// }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads/',express.static(path.join(__dirname, 'uploads')));
app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
    maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

// 定义请求的路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imgUploadRouter = require('./routes/upload');
var videoUploadRouter = require('./routes/uploadVideo');
var student = require('./routes/student');
var getHomePage = require('./routes/getHomePage');
var getVideoList = require('./routes/getVideoList');
var getArticleList = require('./routes/getArticleList');
var getImageList = require('./routes/getImageList');
var getImageListByArea = require('./routes/getImageListByArea');
var getVideoListByArea = require('./routes/getVideoListByArea');
var getVideoById = require('./routes/getVideoById');
var getImageById = require('./routes/getImageById');
var getArticleById = require('./routes/getArticleById');
var addComment = require('./routes/addComment');
var addBarrage = require('./routes/addBarrage');
var username = null;
//var signIn = require('./routes/signIn');
//var signUp = require('./routes/signUp');
var getBarrageByVideoId = require('./routes/getBarrageByVideoId');
var getCommentByVideoId = require('./routes/getCommentByVideoId');
var login = require('./routes/login');
var logout = require('./routes/logout');
var getUser = require('./routes/getUser');
var getVideoListByName = require('./routes/getVideoListByName')
var getArticleListByName = require('./routes/getArticleListByName')
var getImageListByName = require('./routes/getImageListByName')
var uploadImage = require('./routes/uploadImage')
var uploadMp4 = require('./routes/uploadMp4')
var uploadArticle = require('./routes/uploadArticle')

// 使用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', imgUploadRouter);
app.use('/uploadVideo', videoUploadRouter);
app.use('/student', student);
app.use('/getHomePage', getHomePage);
app.use('/getVideoList', getVideoList);
app.use('/getArticleList', getArticleList);
app.use('/getImageList', getImageList);
app.use('/getImageListByArea', getImageListByArea);
app.use('/getVideoListByArea', getVideoListByArea);
app.use('/getVideoById', getVideoById);
app.use('/getImageById', getImageById);
app.use('/getArticleById', getArticleById);
app.use('/addComment', addComment);
app.use('/addBarrage', addBarrage);
// app.use('/login', login);
// app.use('/getUser', getUser)
// app.user('/logout', logout);
//app.use('/signIn', signIn);
//app.use('/signUp', signUp);
app.use('/getBarrageByVideoId', getBarrageByVideoId);
app.use('/getCommentByVideoId', getCommentByVideoId);
app.use('/getVideoListByName', getVideoListByName);
app.use('/getArticleListByName', getArticleListByName);
app.use('/getImageListByName', getImageListByName);
app.use('/uploadImage', uploadImage);
app.use('/uploadMp4', uploadMp4);
app.use('/uploadArticle', uploadArticle);

function Result({code = 0, msg = '200', data = {}}) {
  this.code = code;
  this.msg = msg;
  this.data = data;
};

// app.post('/login', (req, res) =>{
//   if(req.body.username === 'bobo' && req.body.password === '123') {
//     username = req.body.username
//     res.json(
//       new Result({
//         data: {
//           // username: req.session.username,
//           username: username,
//           password: req.body.password
//         }
//       })
//     )
//   }
// });

app.post('/login', (req, res) =>{
  var tag1 = 0;
  var tag2 = 0;
  connect.query('SELECT authorName from author; SELECT password from author;', (err, result) => {
    result[0].forEach(item => {
      if(item.authorName === req.body.username) {
        tag1 = 1;
      }
    });
    result[1].forEach(item => {
      if(item.password === req.body.password) {
        tag2 = 1;
      }
    });
    if(tag1 === 1 && tag2 === 1) {
      username = req.body.username
      connect.query('SELECT * from author where authorName="' +　req.body.username + '"', (err1, result1) => {
        res.json(
          new Result({
            data: result1[0]
          })
        )
      })
    }
  });
    // console.log(req.session)
    // console.log(req.session.username)
    // req.session.save()
});

app.get('/getUser', (req, res) => {
  // cmd.run('notepad');
  connect.query('SELECT * from author where authorName="' +　username + '"', (err, result) => {
    res.json(
      new Result({
        data: result[0]
      })
    )
  })
  
  // console.log(req.session.username)
  // console.log(req.session)
});

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
  // res.header('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials','true');
  res.set('Access-Control-Allow-Origin', '127.0.0.1:3000');// 这里前端访问地址
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
