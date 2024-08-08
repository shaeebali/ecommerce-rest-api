const express = require('express');
const ordersRouter = express.Router();
const ordersController = require('../Controllers/ordersController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../Middleware/verifyRoles');

// All routes for /orders
// Gets all orders
ordersRouter.route('/')
  .get(ordersController.getAllOrders)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ordersController.createNewOrder)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ordersController.updateOrder)
  .delete(verifyRoles(ROLES_LIST.Admin), ordersController.deleteOrder);

// Gets a single order
ordersRouter.route('/:id')
  .get(ordersController.getOrder);

module.exports = ordersRouter;
