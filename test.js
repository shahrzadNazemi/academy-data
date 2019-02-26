let db = require('./database/database')
let mongo = require('./database/mongo')

// let lsnId = "5c592204502538783d9467c0"
// let usrId = "5c4ea5eec7887440c0ff73cf"
// db.getPreviousLesson(lsnId , (lesson)=>{
//     console.log("lesson",lesson)
// })
var moment = require('moment-jalaali')
1548760739576
1548829586210
// moment().subtract(3, 'days'
let pass = moment(1548757139576.0).subtract(3, 'days')
let now = new Date().getTime()
console.log(moment(1550390396538.0).format("YYYY:MM:D HH:mm:ss"))
console.log(moment(pass).format("YYYY:MM:D HH:mm:ss"))

console.log(9<=  moment().format('HH') &&  moment().format('HH') <= 14)



mongo.deleteStudentChatroom("5c72364b1b309229e047a8f7" , (del)=>{
    console.log(del)
})