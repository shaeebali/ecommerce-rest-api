const express = require('express');
const logoutRouter = express.Router();
const logoutController = require('../Controllers/logoutController');

logoutRouter.get('/', logoutController.handleLogout);

module.exports = logoutRouter;
