// Create a order modell class based on the database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  total: {
    type: Schema.Types.Decimal128,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
