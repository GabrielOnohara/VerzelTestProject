const express = require('express');
require('dotenv').config();
const app = express();
const routes = require('./routes'); // Importa o arquivo de rotas

const port = process.env.PORT;

app.use('/', routes); // Usa o roteador para a rota principal

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});