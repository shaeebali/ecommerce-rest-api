const express = require('express');
const registerRouter = express.Router();
const registerController = require('../Controllers/registerController');

registerRouter.post('/', registerController.handleNewUser);

module.exports = registerRouter;
