let db = require('./database/database')
let mongo = require('./database/mongo')

// let lsnId = "5c592204502538783d9467c0"
// let usrId = "5c4ea5eec7887440c0ff73cf"
// db.getPreviousLesson(lsnId , (lesson)=>{
//     console.log("lesson",lesson)
// })
// // var moment = require('moment-jalaali')
// 1548760739576
// 1548829586210
// // moment().subtract(3, 'days'
// // let pass = moment(1548757139576.0).subtract(3, 'days')
// // let now = new Date().getTime()
// // console.log(moment(1554026236509.0).format("YYYY:MM:D HH:mm:ss"))
// // console.log(moment(pass).format("YYYY:MM:D HH:mm:ss"))
// //
// // console.log(9<=  moment().format(
// // 'HH') &&  moment().format('HH') <= 14)
// let usrId ="5ca81385d4f46f731bfa2b97"
// let lvlId = "5ca048f8d4f46f731bfa2b7a"
// // db.addCurrentLevelChatRoom( usrId ,(level)=>{
// // })
// // db.getCertificatePermission(usrId , (stus) =>{
// //     console.log(stus)
// // })
// // let student = {}
// // let chatroom = {}
// db.getCertificatePermission("5cda93c045ec050d73901801" , (del)=>{
//     console.log("del",del)
// })
let MongoClient = require('mongodb').MongoClient;
let config = require('./util/config')

// MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
//     if (err) {
//         console.log("Err", err)
//         cb(-1)
//     }
//     else {
//         var con = db.db('englishAcademy')
//         con.collection("dictionary").insertMany(, (err, result) => {
//             if (err != null) {
//                 if (err.code == 11000) {
//                     cb(-2)
//                 }
//             }
//
//             else if (err) {
//                 console.log(err)
//                 cb(-1)
//             }
//             else if (result.length == 0) {
//                 cb(0)
//             }
//             else {
//                 cb(result.insertedId)
//             }
//         })
//
//     }
// })
