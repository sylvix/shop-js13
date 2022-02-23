const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch(e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const categoryData = req.body;
    const category = new Category(categoryData);
    await category.save();
    return res.send(category);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
