const Grid = require('../models/grid');

// CREATE
exports.create = async (req, res) => {
  try {
    const { title, rows, columns } = req.body;

    const checkboxes = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => false)
    );

    const grid = await Grid.create({
      title,
      rows,
      columns,
      checkboxes
    });

    res.status(201).json(grid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.findAll = async (req, res) => {
  const grids = await Grid.find();
  res.json(grids);
};

// READ ONE
exports.findOne = async (req, res) => {
  const grid = await Grid.findById(req.params.id);
  if (!grid) return res.status(404).json({ error: 'Grid não encontrada' });
  res.json(grid);
};

// UPDATE
exports.update = async (req, res) => {
  const grid = await Grid.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(grid);
};

// DELETE
exports.remove = async (req, res) => {
  await Grid.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
