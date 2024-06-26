const express = require('express');
const {login} = require('./login');
const {register} = require('./register');
const db = require('../db/db');
const authRouter = express.Router();


authRouter.route('/login')
.post(login);

module.exports = authRouter;