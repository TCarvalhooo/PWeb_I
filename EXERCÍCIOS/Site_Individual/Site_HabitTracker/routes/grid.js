const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.render('grid', { gridId: req.params.id });
});

module.exports = router;
