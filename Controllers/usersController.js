// Add logic/CRUD ops in controllers
// const User = require("../models/user") "do this later, will use json for now to test";
// this is similar to a services folder
const data = {};
data.users = require('../Models/users.json');

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
