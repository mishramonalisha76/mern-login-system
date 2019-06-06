var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
// var session = require('express-session');
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
var secretOrKey = "secret";
var url = "mongodb://localhost:27017/mylogin";

mongoose.connect(url, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(session({path:"/",secret:"nosecretcoden",resave:false,saveUninitialize:false}));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
module.exports = app;