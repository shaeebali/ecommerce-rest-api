const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'CartItem',
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
