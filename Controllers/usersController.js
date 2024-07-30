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
  res.json({
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
  });
};

const updateUser = (req, res, next) => {
  res.json({
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
  });
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
