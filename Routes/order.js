const express = require('express');
const ordersRouter = express.Router();
const ordersController = require('../Controllers/ordersController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../Middleware/verifyRoles');

// All routes for /orders
ordersRouter.route('/')
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ordersController.getOrders);


module.exports = ordersRouter;
