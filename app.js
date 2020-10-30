var express = require('express');
var path = require('path');
var router = express.Router();
var mongoose=require('mongoose');
const passport = require('passport');


// Passport Config
require('./config/passport')(passport);


const session = require('express-session');
//...........................................
var indexRouter = require('./routes/index1');

const app = express();


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//============================


// var app = express();

// view engine setup
var swig = require('swig');
app.engine('html',swig.renderFile);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
//=========================
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//============================
//DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db , { useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(7070, function()
{
    console.log("Server  started");
});


module.exports = app;
module.exports = router;

