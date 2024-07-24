const express = require('express');
const usersRouter = express.Router();

// app.get('/users', (req, res, next) => {
//   const db = require('./db');
//   db.query('SELECT * FROM users', (err, result) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Error retrieving users');
//     } else {
//       res.json(result.rows);
//     }
//   });
// });

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
