const express = require('express');
const usersRouter = express.Router();


//sample data below, replace with actual database...data moved to users.json file
// const users = [
//   { id: 1, name: 'John Doe', email: 'john@example.com' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
// ];

// All routes for /user
usersRouter.get();
usersRouter.post();
usersRouter.put();
usersRouter.delete();

module.exports = usersRouter;
