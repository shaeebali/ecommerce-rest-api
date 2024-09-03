const User = require('../Models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// this controller will handle logins
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password ) return res.status(400).json({ "message": "Please provide email and password" });
  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // Create JWTs
    const accessToken = jwt.sign(
      { "UserInfo": { 
          "email": foundUser.email,
          "roles": roles 
          }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '5m' } //set to 5 mins later
    ); 
    const refreshToken = jwt.sign(
      { "email": foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    // Save refreshToken and Write to file(users.json) - save to DB (will do later)
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    
    // Store refreshToken in a secure cookie which is not available to javascript (avoid CSFR/XSS attacks)
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); // add secure: true
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};
module.exports = { handleLogin };
