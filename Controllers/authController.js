const usersDB = {
  users: require('../Models/users.json'),
  setUsers: function (data) { this.users = data; }
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) return res.status(400).json({ "message": "Please provide username, password, and email" });
  const foundUser = usersDB.users.find(user => user.username === username);
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // Create JWTs later
    const accessToken = jwt.sign(
      { "username": foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' } //set to 5 mins later
    ); 
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    // Save refreshToken and Write to file(users.json) - save to DB (will do later)
    const otherUsers = usersDB.users.filter(user => user.username!== foundUser.username);
    const currentUser = {...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(path.join(__dirname, '..', 'Models', 'users.json'),
    JSON.stringify(usersDB.users));
    
    // Store refreshToken in a secure cookie which is not available to javascript (avoid CSFR/XSS attacks)
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};
module.exports = { handleLogin };
