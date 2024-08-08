const User = require('../Models/User');

const handleLogout = async (req, res) => {
  // on client (frontend) side, we need to delete the access token/refresh token.

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content to send
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  
  // Is refresh token in the DB/File?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    return res.sendStatus(204); // no content to send 
  }
  
  // Delete refresh token from DB/File
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204); // no content to send
};
module.exports = { handleLogout }
