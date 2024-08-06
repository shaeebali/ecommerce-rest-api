const User = require('../Models/User');
const bcrypt = require('bcrypt');

// add firstname, lastname, createAt, updateAt to fields below(check same for user model)
const handleNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) return res.status(400).json({ "message": "Please provide username, password, and email" });
  
  // check for duplicate usernames in the DB
  const duplicateUser = await User.findOne({username: username}).exec();
  if (duplicateUser) return res.status(409).json({ "message": "Username already exists" });
  
  try {
    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create and store the new user
    const result = await User.create( { 
      "username": username, 
      "password": hashedPassword, 
      "email": email 
    });
    console.log(result);
    res.status(201).json({ "message": `User ${username} created successfully` });

  } catch (error) {
    res.status(500).json({ "message": error.message });
    console.log(error);
  }
}  
module.exports = { handleNewUser };
