const express = require('express');
const itemsRouter = express.Router();
const itemsController = require('../Controllers/itemsController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../Middleware/verifyRoles');

// All routes for /items
// Gets all items
itemsRouter.route('/')
  .get(itemsController.getAllItems)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), itemsController.createNewItem)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), itemsController.updateItem)
  .delete(verifyRoles(ROLES_LIST.Admin), itemsController.deleteItem);

// Gets a single product
itemsRouter.route('/:id')
  .get(itemsController.getItem);

module.exports = itemsRouter;
