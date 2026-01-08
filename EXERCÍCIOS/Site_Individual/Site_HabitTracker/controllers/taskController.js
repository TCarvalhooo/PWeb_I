const Task = require('../models/task');
const Grid = require('../models/grid');

// CREATE
exports.create = async (req, res) => {
  const { name, gridId } = req.body;

  const grid = await Grid.findById(gridId);
  if (!grid) return res.status(404).json({ error: 'Grid não encontrada' });

  const task = await Task.create({
    name,
    grid: gridId
  });

  res.status(201).json(task);
};

// READ ALL
exports.findAll = async (req, res) => {
  const tasks = await Task.find().populate('grid');
  res.json(tasks);
};

// UPDATE (concluir task)
exports.update = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).populate('grid');

  res.json(task);
};

// DELETE
exports.remove = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
