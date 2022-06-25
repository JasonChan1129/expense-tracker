const express = require('express');
const router = express.Router();

// routes
const home = require('./modules/home');
const records = require('./modules/records');
const users = require('./modules/users');

// auth middleware
const { authenticator } = require('../middleware/auth');

router.use('/users', users);
router.use('/records', authenticator, records);
router.use('/', authenticator, home);

module.exports = router;
