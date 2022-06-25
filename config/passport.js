const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports = app => {
	app.use(passport.initialize());
	app.use(passport.session());

	// verification
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passReqToCallback: true,
			},
			(req, email, password, done) => {
				User.findOne({ email })
					.then(user => {
						if (!user) {
							return done(
								null,
								false
								// req.flash('danger_msg', 'This email has not been registered.')
							);
						}
						return bcrypt
							.compare(password, user.password)
							.then(isMatch => {
								if (!isMatch) {
									return done(
										null,
										false
										// req.flash('danger_msg', 'Incorrect email or password.')
									);
								}
								return done(null, user);
							})
							.catch(err => done(err, false));
					})
					.catch(err => done(err, false));
			}
		)
	);

	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_ID,
				clientSecret: process.env.FACEBOOK_SECRET,
				callbackURL: process.env.FACEBOOK_CALLBACK,
				profileFields: ['email', 'displayName'],
			},
			(accessToken, refreshToken, profile, done) => {
				const { name, email } = profile._json;
				User.findOne({ email })
					.then(user => {
						if (user) {
							return done(null, user);
						}
						const randomPassword = Math.random().toString(36).slice(-8);
						return bcrypt
							.genSalt(10)
							.then(salt => bcrypt.hash(randomPassword, salt))
							.then(hash => {
								return User.create({ username: name, email, password: hash });
							})
							.then(user => done(null, user))
							.catch(err => done(err, false));
					})
					.catch(err => done(err, false));
			}
		)
	);

	// in order to have session works properly
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id)
			.lean()
			.then(user => done(null, user))
			.catch(err => done(err, null));
	});
};
