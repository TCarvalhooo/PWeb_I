const express = require('express');
const router = express.Router();
const Task = require('../../models/task');
const Grid = require('../../models/grid');

// Post – criar nova task
router.post('/', async (req, res) => {
  try {
    const { name, grid } = req.body;

    const gridDoc = await Grid.findById(grid);
    if (!gridDoc) {
      return res.status(404).json({ error: 'Grid não encontrada' });
    }

    let row = null;
    let col = null;

    for (let r = 0; r < gridDoc.rows; r++) {
      for (let c = 0; c < gridDoc.columns; c++) {
        if (!gridDoc.checkboxes[r][c]) {
          row = r;
          col = c;
          break;
        }
      }
      if (row !== null) break;
    }

    if (row === null) {
      return res.status(400).json({ error: 'Grid cheia' });
    }

    const task = await Task.create({
      name,
      grid,
      row,
      col
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get – listar todas as tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Patch – editar task
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task não encontrada' });

    // Editar nome
    if (req.body.name !== undefined) {
      task.name = req.body.name;
    }

    // Marcar como concluída
    if (typeof req.body.completed === 'boolean') {
      task.completed = req.body.completed;

      // Sincroniza com a grid
      const grid = await Grid.findById(task.grid);
      if (grid) {
        grid.checkboxes[task.row][task.col] = task.completed;
        await grid.save();
      }
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete – remover task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removida' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
