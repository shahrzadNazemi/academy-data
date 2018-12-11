const mongoose = require('mongoose');
let config = require('../util/config')
mongoose.connect(`${config.mongoURL}/englishAcademy`,  {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongoose is connected")
});
var Schema = mongoose.Schema;

var student = new Schema({
    "stu_fname" : String,
    "stu_lname" : String,
    "stu_username" : String,
    "stu_password" : String,
    "stu_mobile" : String,
    "stu_avatarUrl" : String,
    "stu_score" : Number,
    "stu_lastPassedLesson" : String
});
var stu = mongoose.model('stu', student);

// stu.save(function (err, stu) {
//     if (err) return console.error(err);
//     console.log(stu)
// });
module.exports.studentLogin = (loginInfo, cb)=> {
    console.log(loginInfo)
            stu.find({
                stu_password: loginInfo.stu_password,
                stu_username: loginInfo.stu_username
            },(err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    console.log(result)
                    cb(result)
                }
            })


};

