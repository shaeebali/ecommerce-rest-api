const User = require('../Models/User');
const bcrypt = require('bcrypt');

// add firstname, lastname, createAt, updateAt to fields below(check same for user model)
const handleNewUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) return res.status(400).json({ "message": "Please provide firstname, lastname, email, and password" });
  
  // check for duplicate usernames in the DB
  const duplicateUser = await User.findOne({email: email}).exec();
  if (duplicateUser) return res.status(409).json({ "message": "Username/Email already exists" });
  
  try {
    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create and store the new user
    const result = await User.create( { 
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "password": hashedPassword
    });
    console.log(result);
    res.status(201).json({ "message": `Account ${email} created successfully` });

  } catch (error) {
    res.status(500).json({ "message": error.message });
    console.log(error);
  }
}  
module.exports = { handleNewUser };
