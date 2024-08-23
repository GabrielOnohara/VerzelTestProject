const express = require('express');
const router = express.Router();

// Defina suas rotas aqui
router.get('/', (req, res) => {
  res.status(200).send('App is running!');
});

// Você pode adicionar mais rotas aqui

module.exports = router;
