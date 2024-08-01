const express = require('express');
const authRouter = express.Router();
const authController = require('../Controllers/authController');

authRouter.post('/', authController.handleLogin);

module.exports = authRouter;
