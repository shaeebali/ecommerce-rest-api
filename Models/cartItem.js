const mongoose = require('mongoose');
const Schema = monogo.Schema;

const cartItem = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'CartItem',
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItem);
