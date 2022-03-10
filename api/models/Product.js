const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mime = require('mime-types');
const config = require('../config');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  image: {
    type: String,
    validate: {
      validator: function(value) { // 9234080jlasdjf.jpg
        const filePath = path.join(config.uploadPath, value);

        const mimeType = mime.lookup(filePath);

        return imageMimeTypes.includes(mimeType);
      },
      message: 'Image file format is incorrect'
    }
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;