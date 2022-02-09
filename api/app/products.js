const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const db = require('../mySqlDb');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    let query = 'SELECT * FROM products';

    if (req.query.filter === 'image') {
      query += ' WHERE image IS NOT NULL';
    }

    if (req.query.orderBy === 'date' && req.query.direction === 'desc') {
      query += ' ORDER BY id DESC';
    }

    let [products] = await db.getConnection().execute(query);

    return res.send(products);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [products] = await db.getConnection().execute('SELECT * FROM products WHERE id = ?', [req.params.id]);

    const product = products[0];

    if (!product) {
      return res.status(404).send({message: 'Not found'});
    }

    return res.send(product);
  } catch (e) {
    next(e);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.price) {
      return res.status(400).send({message: 'Title and price are required'});
    }

    const product = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      description: req.body.description,
      image: null,
    };

    if (req.file) {
      product.image = req.file.filename;
    }

    let query = 'INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)';

    const [results] = await db.getConnection().execute(query, [
      product.title,
      product.price,
      product.description,
      product.image
    ]);

    const id = results.insertId;

    return res.send({message: 'Created new product', id});
  } catch (e) {
    next(e);
  }
});

module.exports = router;