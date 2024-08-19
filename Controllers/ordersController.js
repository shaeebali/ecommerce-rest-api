// const FlutterWave = require('flutterwave-node-v3');
const User = require('../Models/User');
const Order = require('../Models/Order');
const Cart = require('../Models/Cart');

// finish this order controller, its routes and link in app.js
// get orders
const getOrders = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const order = await Order.find({ owner }).sort({ createdAt: -1 });
    if (order) 
      {
        res.status(200).json(order);
      }
      res.status(404).json({ message: "No orders found" });
  } catch {
    res.status(5000).json({ message: "Internal server error" });
  }
};

// checkout
