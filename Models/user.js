// create a user model class based on the database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// add firstname, lastname, createAt, updateAt to fields
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001
    },
    Editor: Number,
    Admin: Number
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  refreshToken: String,  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
