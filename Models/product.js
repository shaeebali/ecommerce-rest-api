// Create a product model class based on the database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  timestamps: true,
});
module.exports = mongoose.model('Product', productSchema);
