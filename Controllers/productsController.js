// Add logic/CRUD ops in controllers
const Product = require('../Models/Product');

// get all products
const getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  if (!products) return res.status(204).json({ "message": "No products found" });
  res.json(products);
};

// create a new product
const createNewProduct = async (req, res, next) => {
  if (!req?.body?.name || !req?.body?.description || !req?.body?.price) {
    return res.status(400).json({ 'message': 'Name, description and price are required' });
  }

  try {
    const result = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });
    res.status(201).json(result);
  } catch(error) {
    console.log(error);
  }
};

// update a product
const updateProduct = async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'Product ID parameter is required' });
  }
  const product = await Product.findOne({ _id: req.body.id }).exec();

  if (!product) {
    return res.status(204).json({ message: `Product ID ${req.body.id} does not match any product` });
  }
  if  (req.body?.name) product.name = req.body.name;
  if (req.body?.description) product.description = req.body.description;
  if (req.body?.price) product.price = req.body.price;

  const result = await product.save();

  res.status(200).json(result);
};

// delete a product
const deleteProduct = async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'Product ID required' });
  }
  const product = await Product.findOne({ _id: req.body.id }).exec();

  if (!product) {
    return res.status(204).json({ message: `Product ID ${req.body.id} does not match any product` });
  }
  const result = await product.deleteOne({ _id: req.body.id });

  res.status(200).json(result);
};

// get a single product
const getProduct = async (req, res, next) => {
  if (!req?.params?.id) {
    return res.status(400).json({ 'message': 'Product ID required' });
  }
  const product = await Product.findOne({ _id: req.params.id }).exec();

  if (!product) {
    return res.status(204).json({ message: `Product ID ${req.params.id} does not match any product` });
  }
  res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProduct
};
