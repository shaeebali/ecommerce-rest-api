const express = require('express');
const usersRouter = express.Router();
const usersController = require('../Controllers/usersController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../Middleware/verifyRoles');

//sample data below, replace with actual database...data moved to users.json file
// const users = [
//   { id: 1, name: 'John Doe', email: 'john@example.com' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
// ];

// All routes for /user
// Gets all users
usersRouter.route('/')
  .get(usersController.getAllUsers)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), usersController.createNewUser)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), usersController.updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

// Gets a single user
 usersRouter.route('/:id')
  .get(usersController.getUser);

module.exports = usersRouter;
