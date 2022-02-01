const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const db = require('../fileDb');

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

router.get('/', (req, res) => {
  const products = db.getItems();
  return res.send(products);
});

router.get('/:id', (req, res) => {
  const product = db.getItem(req.params.id);

  if (!product) {
    return res.status(404).send({message: 'Not found'});
  }

  return res.send(product);
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.price) {
      return res.status(400).send({message: 'Title and price are required'});
    }

    const product = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
    };

    if (req.file) {
      product.image = req.file.filename;
    }

    await db.addItem(product);

    return res.send({message: 'Created new product', id: product.id});
  } catch (e) {
    next(e);
  }
});

module.exports = router;