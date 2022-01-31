const express = require('express');
const cors = require('cors');
const db = require('./fileDb');
const products = require('./app/products');
const app = express();

const port = 8000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use('/products', products);

const run = async () => {
  await db.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(e => console.error(e));