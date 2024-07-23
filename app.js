var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var poliRouter = require('./routes/polis');
var doctorRouter = require('./routes/doctors');
var rekammedisRouter = require('./routes/rekammediss');
var pemesananRouter = require('./routes/pemesanans');
var transaksiRouter = require('./routes/transaksis');

var sequelize = require('./models/index');
var User = require('./models/user');
var Poli = require('./models/poli');
var Doctor = require('./models/doctor');
var Rekammedis = require('./models/rekammedis');
var Pemesanan = require('./models/pemesanan');
var Transaksi = require('./models/transaksi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/poli', poliRouter);
app.use('/doctor', doctorRouter);
app.use('/rm', rekammedisRouter);
app.use('/pesan', pemesananRouter);
app.use('/transaksi', transaksiRouter);


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

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = app;
