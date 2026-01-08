const mongoose = require('mongoose');

const GridSchema = new mongoose.Schema({
  title: String,
  rows: Number,
  columns: Number,
  checkboxes: [[Boolean]]
});

module.exports = mongoose.model('Grid', GridSchema);
