const express = require('express');
const usersRouter = express.Router();


//sample data below, replace with actual database...
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

usersRouter.get('/:id', (req, res, next) => {
  const user = users[req.params.id];

  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = usersRouter;
