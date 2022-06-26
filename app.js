const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const usePassport = require('./config/passport');
const session = require('express-session');
const flash = require('connect-flash');
const helpers = require('handlebars-helpers')();

// connect to mongoDB
require('./config/mongoose');
const routes = require('./routes/index');

const port = process.env.PORT || 3000;

const app = express();

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers }));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
usePassport(app);
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated();
	res.locals.users = req.user;
	res.locals.success_msg = req.flash('success_msg');
	res.locals.warning_msg = req.flash('warning_msg');
	res.locals.danger_msg = req.flash('danger_msg');
	next();
});
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(routes);

app.listen(port, () => console.log(`server is listening on localhost:${port}`));
