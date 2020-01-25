var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var config = require("./config/config.json")[process.env["node_env"]];
var bodyParser = require("body-parser")
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
console.log(config)
config= JSON.parse(JSON.stringify(config))
console.log(config)
var options = {
    host:config.mysql.hostname,
    port: config.mysql.port,
    user: config.mysql.username,
    password: config.mysql.password,
    database:  config.mysql.database,
    schema: {
      tableName: 'user_sessions',
      columnNames: {
          session_id: 'session_id',
          expires: 'expires',
          data: ['user_id', 'is_admin']
      }
  }
};
 
var connection = mysql.createConnection(options);
var sessionStore = new MySQLStore(options, connection);
var app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({limit: "40mb", extended: true}));
app.use(bodyParser.json({limit: "40mb"}));

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
var indexRouter = require('./routes/index');

var app = express();

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies && req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
  console.log(err);
  res.status(err.status || 500);
  res.render('error');
});
app.listen(config.port, ()=>{ console.log("Node server running at ",config.port)});
module.exports = app;
