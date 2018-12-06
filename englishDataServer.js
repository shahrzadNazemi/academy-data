var express = require('express');
// var path = require('path');
var bodyParser = require('body-parser');
var logger = require('./util/customMorgan');

var app = express();

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let user  = require('./routes/users');
let level = require('./routes/level');
let lesson = require('./routes/lesson');




app.use('/api/users' , user);
app.use('/api/level' , level);
app.use('/api/lesson' , lesson);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
});
app.listen(9090 , ()=>{
    console.log("dataEnglish is listening on 9090")
})

module.exports = app;
