let db = require('./database/database')

let lsnId = "5c592204502538783d9467c0"
let usrId = "5c4ea5eec7887440c0ff73cf"
db.getPreviousLesson(lsnId , (lesson)=>{
    console.log("lesson",lesson)
})
// var moment = require('moment')
// 1548760739576
// 1548829586210
//
// let pass = moment(1548757139576.0).add(5 ,'m') 
// let now = new Date().getTime()
// console.log(now)
//
// console.log(moment(pass).format("HH:mm:ss"))