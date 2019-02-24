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
let question = require('./routes/question');
let exam = require('./routes/exam');
let view = require('./routes/view')
let result = require('./routes/result')
let notification = require('./routes/notification')
let trick = require('./routes/trick')
let certificate = require('./routes/certificate')
let ticket = require('./routes/ticket')
var cron = require('./util/cronJobHelper')
let chatroom = require('./routes/chatroom')
let message = require('./routes/message')





app.use('/api/users' , user);
app.use('/api/level' , level);
app.use('/api/lesson' , lesson);
app.use('/api/question', question);
app.use('/api/exam', exam);
app.use('/api/view', view);
app.use('/api/result', result);
app.use('/api/notification', notification);
app.use('/api/trick', trick);
app.use('/api/certificate', certificate);
app.use('/api/ticket', ticket);
app.use('/api/chatroom', chatroom);
app.use('/api/message', message);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
});
app.listen(9090 , ()=>{
    console.log("dataEnglish is listening on 9090")
})

module.exports = app;
