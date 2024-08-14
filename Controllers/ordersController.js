// add logic/CRUD ops in controllers
// ?require OrderItem model see ERD diagram
const Order = require('../Models/Order');
const orderItem = require('../Models/OrderItem');

// get all orders
const getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) return res.status(204).json({ "message": "No orders found" });
  res.json(orders);
};

// create a new order
const createNewOrder = async (req, res, next) => {
  if (!req?.body?.user || !req?.body?.status || !req?.body?.total || !req?.body?.qty || !req?.body?.price || !req?.body?.productId) {
    return res.status(400).json({ 'message': 'User, status and total are required' });
  }
  try {
    const result = await Order.create({
      user: req.body.user,
      status: req.body.status,
      total: req.body.total
    });
    const result2 = await orderItem.create({
      orderId: result._id,
      productId: req.body.productId,
      qty: req.body.qty,
      price: req.body.price
    });
    res.status(201).json(result && result2);
  } catch(error) {
    console.log(error);
  }
};

// update an order
const updateOrder = async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'Order ID parameter is required' });
  }
  const order = await Order.findOne({ _id: req.body.id }).exec();

  if (!order) {
    return res.status(204).json({ message: `Order ID ${req.body.id} does not match any order` });
  }
  if  (req.body?.user) order.user = req.body.user;
  if (req.body?.status) order.status = req.body.status;
  if (req.body?.total) order.total = req.body.total;

  const result = await order.save();

  res.status(200).json(result);
};

// delete an order
const deleteOrder = async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'Order ID required' });
  }
  const order = await Order.findOne({ _id: req.body.id }).exec();

  if (!order) {
    return res.status(204).json({ message: `Order ID ${req.body.id} does not match any order` });
  }
  const result = await order.deleteOne({ _id: req.body.id });

  res.status(200).json(result);
};

// get a single order
const getOrder = async (req, res, next) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Order ID required' });
  const order = await Order.findOne({ _id: req.params.id }).exec();

  if (!order) {
    return res.status(204).json({ message: `Order ID ${req.params.id} does not match any order` });
  }
  res.status(200).json(order);
};

module.exports = {
  getAllOrders,
  createNewOrder,
  updateOrder,
  deleteOrder,
  getOrder
};
