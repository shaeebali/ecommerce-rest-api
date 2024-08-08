const express = require('express');
const productsRouter = express.Router();
const productsController = require('../Controllers/productsController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../Middleware/verifyRoles');

// All routes for /products
// Gets all products
productsRouter.route('/')
  .get(productsController.getAllProducts)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productsController.createNewProduct)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productsController.updateProduct)
  .delete(verifyRoles(ROLES_LIST.Admin), productsController.deleteProduct);

// Gets a single product
productsRouter.route('/:id')
  .get(productsController.getProduct);

module.exports = productsRouter;     
