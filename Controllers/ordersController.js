// const FlutterWave = require('flutterwave-node-v3'); replace with STRIPE
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

// checkout (need to add ID's and Pins). Replace with STRIPE checkout
const checkoutOrder = async (req, res, next) => {
  try {
    const owner = req.user._id;
    let payload = req.body;

    //find cart and user
    let cart = await Cart.findOne({ owner });
    let user = req.user;

    if (cart) {
      payload = { ...payload, amount: cart.bill, email: user.email }
        const response = await new FlutterWave.Charge.card(payload); //check for errors later
        console.log(response);

        if (response.meta.authorizaration.mode === 'pin') {
          let payload2 = payload
          payload2.authorization = {
            "mode": "pin",
            "fields": [
              "pin"
            ],
            "pin": "1234" // change to actual pin once have it
          }
          const reCallCharge = await new FlutterWave.Charge.card(payload2);

          const callValidate = await new FlutterWave.Charge.validate({
            "otp": "1234",
            "flw_ref": reCallCharge.data.flw_ref
          });
          console.log(callValidate);
          
          if (callValidate.status === 'success') {
            const order = await Order.create({
              owner,
              items: cart.items,
              bill: cart.bill
            })
            // delete cart
            const data = await Cart.findOneAndDelete({ _id: cart.id });
            return res.status(200).json({ message: "Order created successfully", order });
          } else {
            res.status(400).json({ message: "Payment failed" });
          }
        }
        if ( response.meta.authorization.mode === 'redirect' ) {
          let url = response.meta.authorization.redirect;
          open(url);
          console.log(response);
        } else {
          res.status(400).json({ message: "Cart not found" });
        }
    }
  } catch(error) {
    res.status(400).json({ message: "Invalid request" });
    console.log(error);
  }
}  


module.exports = {
  getOrders,
  checkoutOrder
};
