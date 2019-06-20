var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
const passport = require("passport");
const users = require("./routes/api/users");



// var session = require('express-session');




var url = "mongodb://localhost:27017/mylogin";

mongoose.connect(url, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(session({path:"/",secret:"nosecretcoden",resave:false,saveUninitialize:false}));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);


// production error handler
// no stacktraces leaked to user


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
module.exports = app;