const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },  
  price: {
    type: Number,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
