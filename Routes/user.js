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
usersRouter.get(usersController.getAllUsers);
//Gets a single user
usersRouter.get(usersController.getUser);
usersRouter.post(usersController.createNewUser);
usersRouter.put(usersController.updateUser);
usersRouter.delete(usersController.deleteUser);

module.exports = usersRouter;
