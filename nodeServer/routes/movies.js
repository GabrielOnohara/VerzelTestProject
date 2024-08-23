const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('List of movies');
});

router.get('/:id', (req, res) => {
  res.status(200).send(`User with ID ${req.params.id}`);
});

module.exports = router;