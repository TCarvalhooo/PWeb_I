const express = require('express');
const router = express.Router();
const Grid = require('../../models/grid');

// Get – listar todas as grids
router.get('/', async (req, res) => {
  try {
    const grids = await Grid.find();
    res.json(grids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get – obter grid por ID
router.get('/:id', async (req, res) => {
  try {
    const grid = await Grid.findById(req.params.id);
    if (!grid) {
      return res.status(404).json({ error: 'Grid não encontrada' });
    }
    res.json(grid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Post – criar nova grid
router.post('/', async (req, res) => {
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
});

// Patch – atualizar estado do checkbox
router.patch('/:id/checkbox', async (req, res) => {
  const { row, col, value } = req.body;

  try {
    const grid = await Grid.findById(req.params.id);
    if (!grid) {
      return res.status(404).json({ error: 'Grid não encontrada' });
    }

    grid.checkboxes[row][col] = value;
    await grid.save();

    res.json(grid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete – remover grid
router.delete('/:id', async (req, res) => {
  try {
    await Grid.findByIdAndDelete(req.params.id);
    res.json({ message: 'Grid removida' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH – editar grid
router.patch('/:id', async (req, res) => {
  const grid = await Grid.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(grid);
});

module.exports = router;
