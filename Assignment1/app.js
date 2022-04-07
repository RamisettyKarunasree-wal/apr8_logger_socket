var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const mongoose = require('mongoose');

// const sqproductsRouter = require('./routes/sqproducts');
const session = require('express-session');
// const usersRouter = require('./routes/users');
// const productsRouter = require('./routes/products');
// const companyRouter = require('./routes/company');
const indexRouter = require('./routes/index');

// require('dotenv').config();
// console.log(`the application name is ${process.env.appName}`);

var app = express();
// mongoose.connect(process.env.mongoConnUrl, { useNewUrlParser: true });
// let db = mongoose.connection;
// db.on('error', function (error) {
//   console.log('unable to connect to the mongodb');
//   console.log(error);
// });
// db.on('open', function () {
//   console.log('we are connected to the mongodb server via mongoose ');
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(logger('combined'));
// app.use(logger('tiny'));
// app.use(logger('short'));
// app.use(logger('common'));
// app.use(logger('my own message :status'));
app.use(
  logger(
    'status-:status\nmethod-:method\nurl-:url\ncontent-length-:res[content-length]\ntime-:response-time ms'
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'session_secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

// app.use('/sqproducts', sqproductsRouter);
// app.use('/users', usersRouter);
// app.use('/products', productsRouter);
// app.use('/company', companyRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
