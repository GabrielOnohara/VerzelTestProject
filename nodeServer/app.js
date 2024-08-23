const express = require('express');
require('dotenv').config();
const app = express();
const routes = require('./routes'); // Importa o arquivo de rotas

const port = process.env.PORT || 5000;

app.use('/', routes);
app.get('/', (req, res) => {
  res.status(200).send('App is running!')
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});