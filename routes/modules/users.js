const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../../models/user');

router.get('/login', (req, res) => {
	res.render('login');
});

module.exports = router;
