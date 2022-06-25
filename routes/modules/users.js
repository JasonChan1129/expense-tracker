const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../../models/user');

router.get('/login', (req, res) => {
	res.render('login');
});

router.post(
	'/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login' })
);

router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', (req, res) => {
	const { name, email, password, confirmPassword } = req.body;
	const errors = [];

	// if missing fields
	if (!email || !password || !confirmPassword) {
		errors.push({ message: 'All fields are required.' });
	}
	// if password and confirm password not matched
	if (password !== confirmPassword) {
		errors.push({ message: 'Password and confirm password not match' });
	}
	if (errors.length) {
		return res.render('register', { name, email, password, confirmPassword, errors });
	}

	User.findOne({ email }).then(user => {
		if (user) {
			errors.push({ message: 'This email has been registered.' });
			return res.render('register', { name, email, password, confirmPassword, errors });
		}
		// hash password and create user
		return bcrypt
			.genSalt(10)
			.then(salt => bcrypt.hash(password, salt))
			.then(hash => {
				return User.create({ name, email, password: hash })
					.then(user => {
						console.log('user registered.');
						return res.redirect('/');
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	});
});

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'You have logged succesfully!');
	res.redirect('/users/login');
});

module.exports = router;
