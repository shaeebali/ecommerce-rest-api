const usersDB = {
  users: require('../Models/users.json'),
  setUsers: function (data) { this.users = data; }
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) return res.status(400).json({ "message": "Please provide username, password, and email" });
  // check for duplicate usernames in the DB
  const duplicateUser = usersDB.users.find(user => user.username === username);
  if (duplicateUser) return res.status(409).json({ "message": "Username already exists" });
  try {
    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    // store the new user
    const newUser = { 
      "username": username,
      "roles": { "User": 2001}, 
      "password": hashedPassword, 
      "email": email 
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    // write the new usersDB to the file
    await fsPromises.writeFile(path.join(__dirname, "..", "Models", "users.json"), JSON.stringify(usersDB.users));
    console.log(usersDB.users)
    res.status(201).json({ "message": `User ${username} created successfully` });

  } catch (error) {
    res.status(500).json({ "message": error.message });
    console.log(error);
  }
}  
module.exports = { handleNewUser };
