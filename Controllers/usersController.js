// Add logic/CRUD ops in controllers
// const User = require("../models/user") "do this later, will use json for now to test";
// this is similar to a services folder
const User = require('../Models/User');

const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ "message": "No users found" });
  res.json(users);
};

const createNewUser = async (req, res, next) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res.status(400).json({ 'message': 'First and last names are required' });
  }

  try {
    const result = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);

  } catch(error) {
    console.log(error);
  }
}  

const updateUser = async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'User ID parameter is required' });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();

  if (!user) {
    return res.status(204).json({ message: `User ID ${req.body.id} does not match any user` });
  }
  if  (req.body?.firstname) user.firstname = req.body.firstname;
  if (req.body?.lastname) user.lastname = req.body.lastname;
  
  const result = await user.save();
  
  res.status(200).json(result);
};

const deleteUser = async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'User ID required' });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res.status(204).json({ message: `User ID ${req.body.id} does not match any user` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.status(200).json(result);
};

// Get a single user by id
const getUser = async (req, res, next) => {
  if (!req?.params?.id) {
    return res.status(400).json({ 'message': 'User ID required' });
  }
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res.status(204).json({ message: `User ID ${req.params.id} does not match any user` });
  }
  res.status(200).json(user);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
};
