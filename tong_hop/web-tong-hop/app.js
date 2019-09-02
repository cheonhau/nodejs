const express = require('express');
// csrf security view
var cookieParser = require('cookie-parser');
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
// const bodyParser = require('body-parser');
const util = require("util");// console
const errorHandler = require('errorhandler');

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';
// console.log(isProduction);

// require debug
require('./debug/config');

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

if(!isProduction) {
  app.use(errorHandler());
}

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

if(!isProduction) {
  //Error handlers & middlewares
  // Since this is the last non-error-handling
  // middleware use()d, we assume 404, as nothing else
  // responded.

  // $ curl http://localhost:5000/notfound
  // $ curl http://localhost:5000/notfound -H "Accept: application/json"
  // $ curl http://localhost:5000/notfound -H "Accept: text/plain"
  app.use((req, res, next) => {
    res.status(404);

    res.format({
      html: function () {
        res.render('errors/404');
      },
      json: function () {
        res.json({ error: 'Not found' })
      },
      default: function () {
        res.type('txt').send('Not found')
      }
    })
  });

  // error-handling middleware, take the same form
  // as regular middleware, however they require an
  // arity of 4, aka the signature (err, req, res, next).
  // when connect has an error, it will invoke ONLY error-handling
  // middleware.

  // If we were to next() here any remaining non-error-handling
  // middleware would then be executed, or if we next(err) to
  // continue passing the error, only error-handling middleware
  // would remain being executed, however here
  // we simply respond with an error page.
  app.use(function(err, req, res, next){
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.status(err.status != 400 || 500);
    res.render('500', { error: err });
  });
}

app.listen(PORT, console.log(`Server started on port ${PORT}`));
