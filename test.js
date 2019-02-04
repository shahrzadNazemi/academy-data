let db = require('./database/database')

let lsnId = "5c484e1852faa438c36c3da1"
db.getPerviousLesson(lsnId , (lesson)=>{
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