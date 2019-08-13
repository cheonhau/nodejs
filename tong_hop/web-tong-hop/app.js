const express = require('express');
// csrf security view
var cookieParser = require('cookie-parser');
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
// const bodyParser = require('body-parser');
const util = require("util");

// require debug
require('./debug/config');
console.loginfo('ghi log bug');

const app = express();

// use form multipart
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

// create public folder
app.use('/', express.static(__dirname + '/public'));

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
// app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  // show error in view
  res.locals.error_view = req.flash('error_view');
  // show result in view
  res.locals.result_view = req.flash('result_view');
  // use for var_dump data
  app.locals.inspect = util.inspect;
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/simple', require('./routes/simple.route'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
