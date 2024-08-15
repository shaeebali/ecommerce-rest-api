const express = require('express');
const cartsRouter = express.Router();
const cartsController = require('../Controllers/cartsController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../Middleware/verifyRoles');

// All routes for /carts
cartsRouter.route('/')
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), cartsController.addCart)
  .delete(verifyRoles(ROLES_LIST.Admin), cartsController.deleteCartItems);

// Gets a single users cart
cartsRouter.route('/:id')
  .get(cartsController.getCart);

module.exports = cartsRouter;
