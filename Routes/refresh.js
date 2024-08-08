const express = require('express');
const refreshTokenRouter = express.Router();
const refreshTokenController = require('../Controllers/refreshTokenController');

refreshTokenRouter.get('/', refreshTokenController.handleRefreshToken);

module.exports = refreshTokenRouter;
