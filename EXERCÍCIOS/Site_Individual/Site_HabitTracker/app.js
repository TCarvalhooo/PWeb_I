const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

dotenv.config();

// Importing routes
var addGridRouter = require('./routes/addGrid');
var addTaskRouter = require('./routes/addTask');
var homeRouter = require('./routes/home');
var gridRouter = require('./routes/grid');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`Acesso registrado: ${req.method} ${req.url}`);
  next();  
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/grids', require('./routes/api/grids.routes'));
app.use('/api/tasks', require('./routes/api/tasks.routes'));

// Web routes
app.use('/addGrid', addGridRouter);
app.use('/addTask', addTaskRouter);
app.use('/', homeRouter);
app.use('/grids', gridRouter);

// Error handling
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

// Connect to MongoDB
const connectBD = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao MongoDB")
  } catch (error) {
    console.log("Erro ao conectar ao MongoDB", error)

  }
}

connectBD();

module.exports = app;
