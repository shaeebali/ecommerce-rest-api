const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  productId: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  qty: {
    type: Number,
    required: true // quantity of products ordered
  },
  price: {
    type: Number,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('OrderItem', orderItemSchema);
