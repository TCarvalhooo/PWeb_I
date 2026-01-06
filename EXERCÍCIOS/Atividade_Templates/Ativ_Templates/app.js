var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`Acesso registrado: ${req.method} ${req.url}`);
  next();  
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var magicRouter = require('./routes/magic');
var aboutRouter = require('./routes/about');
var dataRouter = require('./routes/data');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/magic', magicRouter);
app.use('/about', aboutRouter);
app.use('/data', dataRouter);


app.use((req, res, next) => {
    res.status(404);
    res.send('Page not found <a href="/">Back to homepage</a>');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
});
});

module.exports = app;
