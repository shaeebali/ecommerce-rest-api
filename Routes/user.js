const express = require('express');
const usersRouter = express.Router();
const usersController = require('../Controllers/usersController');

//sample data below, replace with actual database...data moved to users.json file
// const users = [
//   { id: 1, name: 'John Doe', email: 'john@example.com' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
// ];

// All routes for /user
// Gets all users
usersRouter.route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

// Gets a single user
 usersRouter.route('/:id')
  .get(usersController.getUser);

module.exports = usersRouter;
