// Add logic/CRUD ops in controllers
// const User = require("../models/user") "do this later, will use json for now to test";
// this is similar to a services folder
const data = {
  users: require('../Models/users.json'),
  setUsers: function (data) { this.users = data; }
};

const getAllUsers = (req, res, next) => {
  res.json(data.users);
};

const createNewUser = (req, res, next) => {
  const newUser = {
    id: data.users?.length ? data.users[data.users.length - 1].id + 1 : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  }
  if (!newUser.firstname ||!newUser.lastname ||!newUser.email) {
    res.status(400).json({ error: 'Please provide all fields' });
  }
  data.setUsers([...data.users, newUser]);
  res.status(201).json(data.users);
};

const updateUser = (req, res, next) => {
  const user = data.users.find(user => user.id === parseInt(req.body.id));
  if (!user) {
    res.status(400).json({ message: `User ID ${req.body.id} not found` });
  }
  if  (req.body.firstname) user.firstname = req.body.firstname;
  if (req.body.lastname) user.lastname = req.body.lastname;
  if (req.body.email) user.email = req.body.email;
  const filteredArray = data.users.filter(user => user.id !== parseInt(req.body.id));
  const unsortedArray = [...filteredArray, user];
  data.setUsers(unsortedArray.sort((a, b) => a.id - b.id ? 1 : a.id < b.id ? -1 : 0));
  res.status(200).json(data.users);
};

const deleteUser = (req, res, next) => {
  res.json({ "id": req.body.id });
};

// Get a single user by id
const getUser = (req, res, next) => {
  res.json({ "id": req.params.id });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
};
