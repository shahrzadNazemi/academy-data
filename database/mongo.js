let MongoClient = require('mongodb').MongoClient;
let config = require('../util/config')
let ObjectID = require('mongodb').ObjectID;
let assert = require('assert')
let logger = require('../util/logger')

module.exports.adminLogin = (loginInfo, cb)=> {
    console.log(loginInfo)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("admins").find({
                password: loginInfo.password,
                username: loginInfo.username
            }).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    con.collection("supporter").find({
                        password: loginInfo.password,
                        username: loginInfo.username
                    }).toArray((err, result) => {
                        if (err) {
                            cb(-1)
                        }
                        else if (result.length == 0) {
                            con.collection("chatAdmin").find({
                                password: loginInfo.password,
                                username: loginInfo.username
                            }).toArray((err, result) => {
                                if (err) {
                                    cb(-1)
                                }
                                else if (result.length == 0) {
                                    cb(0)
                                }
                                else {
                                    result[0].role = "chatAdmin"
                                    cb(result[0])
                                }
                            })
                        }
                        else {
                            result[0].role = "supporter"
                            cb(result[0])
                        }
                    })
                }
                else {
                    result[0].role = "admin"
                    cb(result[0])
                }
            })

        }
    })
};

module.exports.studentLogin = (loginInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("student").find({
                password: loginInfo.password,
                username: loginInfo.username
            }).toArray((err, result) => {
                console.log(result)
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result[0])
                }
            })

        }
    })
};

module.exports.postLevel = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof info.order == "string") {
                info.order = parseInt(info.order)
            }
            var con = db.db('englishAcademy')
            con.collection("level").insertOne({
                "title": info.title,
                "description": info.description,
                "avatarUrl": info.avatarUrl,
                "order": info.order
            }, (err, result) => {
                if (err != null) {
                    if (err.code == 11000) {
                        var field = err.errmsg.split('index:')[1]
// now we have `title_1 dup key`
                        field = field.split(' dup key')[0]
                        field = field.substring(0, field.lastIndexOf('_'))
                        if (field == " title") {
                            cb(-2)
                        }
                        else {
                            cb(-3)
                        }
                    }
                }
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postNotification = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("notification").insertOne({
                "text": info.text,
                "avatarUrl": info.avatarUrl,
                "link": info.link,
                "title": info.title,
                "viewedUsers": info.viewedUsers
            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postQuestion = (info, cb)=> {
    console.log(info)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (info.lesson.value != undefined && info.lesson.value != "") {
                info.lesson.value = new ObjectID(`${info.lesson.value}`)
            }
            if (info.exam.value != undefined && info.exam.value != "") {
                info.exam.value = new ObjectID(`${info.exam.value}`)
            }
            if (info.typeId != undefined && info.typeId != "") {
                info.typeId = new ObjectID(`${info.typeId}`)
            }
            con.collection("question").insertOne({
                "content": info.content,
                "score": info.score,
                "type": info.type,
                "typeId": info.typeId,
                "lesson": info.lesson,
                "exam": info.exam,
                "answers": info.answers,
                "trueIndex": info.trueIndex,
                "url": info.url
            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postExam = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (info.preLesson.value != undefined && info.preLesson.value != "") {
                info.preLesson.value = new ObjectID(`${info.preLesson.value}`)
            }
            var con = db.db('englishAcademy')
            con.collection("exam").insertOne({
                "title": info.title,
                "time": info.time,
                "preLesson": info.preLesson,
                "avatarUrl": info.avatarUrl
            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.editExam = (info, exId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (info.preLesson.value != undefined && info.preLesson.value != "") {
                info.preLesson.value = new ObjectID(`${info.preLesson.value}`)
            }
            con.collection("exam").updateOne({"_id": new ObjectID(exId)}, {
                $set: {
                    "title": info.title,
                    "time": info.time,
                    "preLesson": info.preLesson,
                    "avatarUrl": info.avatarUrl
                }
            }, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.result.n == 1) {
                    cb(info)

                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.updateResultByLsnId = (lsnId, info, cb)=> {
    console.log("info in update result by lesson", info)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (info.quizCount) {
                con.collection("result").updateMany({"lsnId": new ObjectID(lsnId)}, {
                        $inc: {
                            "quiz.quizCount": info.quizCount,
                            "quiz.quizScore": info.quizScore
                        },
                    }
                    , (err, result)=> {
                        if (err) {
                            console.log(err)
                            cb(-1)
                        }
                        else if (result != null) {
                            cb(result)

                        }
                        else {
                            cb(0)
                        }
                    })

            } else {
                con.collection("result").updateMany({"lsnId": new ObjectID(lsnId)}, {
                        $inc: {
                            "exam.examCount": info.examCount,
                            "exam.examScore": info.examScore
                        },

                    }
                    ,
                    (err, result)=> {
                        if (err) {
                            console.log(err)

                            cb(-1)
                        }
                        else if (result != null) {
                            cb(result)

                        }
                        else {
                            cb(0)
                        }
                    }
                )

            }
        }
    })
};

module.exports.unPinMsg = ( cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
                con.collection("message").updateMany({"pinned": true}, {
                        $set: {
                            "pinned": false
                        },
                    }
                    , (err, result)=> {
                        if (err) {
                            console.log(err)
                            cb(-1)
                        }
                        else if (result != null) {
                            cb(result)

                        }
                        else {
                            cb(0)
                        }
                    })


        }
    })
};
module.exports.deleteStudentChatroom = ( chId , cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {

            var con = db.db('englishAcademy')
            con.collection("student").updateMany({ },
            { $pull: { chatrooms: {"_id": new ObjectID(`${chId}`)} } },
            { multi: true }
                , (err, result)=> {
                    if (err) {
                        console.log(err)
                        cb(-1)
                    }
                    else if (result != null) {
                        cb(result)

                    }
                    else {
                        cb(0)
                    }
                })
        }
    })
};

module.exports.deleteChatAdminChatroom = ( chId , cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {

            var con = db.db('englishAcademy')
            con.collection("chatAdmin").updateMany({ },
                { $pull: { chatrooms: {"_id": new ObjectID(`${chId}`)} } },
                { multi: true }
                , (err, result)=> {
                    if (err) {
                        console.log(err)
                        cb(-1)
                    }
                    else if (result != null) {
                        cb(result)

                    }
                    else {
                        cb(0)
                    }
                })
        }
    })
};




module.exports.getTktById = (tktId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("ticket").findOne({"_id": new ObjectID(`${tktId}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getTktBydepId = (depId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("ticket").find({"depId": new ObjectID(`${depId}`)}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};


module.exports.getTktBySupId = (supId, cb)=> {
    logger.info("supId", supId)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (supId != 0) {
                supId = new ObjectID(`${supId}`)
            }
            if (supId == 0) {
                supId = 0
            }
            con.collection("ticket").aggregate([
                {$match: {"supId": supId}},
                {
                    $lookup: {
                        from: "student",
                        localField: "usrId",
                        foreignField: "_id",
                        as: "student"
                    }
                },
            ]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getTktByStuId = (stuId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("ticket").aggregate([
                {$match: {"usrId": new ObjectID(`${stuId}`)}},
                {
                    $lookup: {
                        from: "supporter",
                        localField: "supId",
                        foreignField: "_id",
                        as: "supporter"
                    }
                },
                {
                    $lookup: {
                        from: "ticketType",
                        localField: "depId",
                        foreignField: "_id",
                        as: "department"
                    }
                },
                {
                    $sort: {time: -1}
                },
            ]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.postView = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (info.usrId != undefined && info.usrId != "") {
                info.usrId = new ObjectID(`${info.usrId}`)
            }
            if (info.lsnId != undefined && info.lsnId != "0") {
                info.lsnId = new ObjectID(`${info.lsnId}`)
            }
            var con = db.db('englishAcademy')
            con.collection("view").insertOne({
                "usrId": info.usrId,
                "video": info.video,
                "sound": info.sound,
                "lsnId": info.lsnId,
                "viewPermission": info.viewPermission
            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    console.log(result.insertedId)
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postTicket = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (info.usrId != undefined && info.usrId != "") {
                info.usrId = new ObjectID(`${info.usrId}`)
            }
            if (info.depId != undefined && info.depId != "") {
                info.depId = new ObjectID(info.depId)
            }
            if (info.msg != undefined && info.msg != "") {
                info.msg._id = new ObjectID()
                info.msg.image = ""
            }
            info.msg = {
                "sender": info.msg.sender,
                "title": info.msg.title,
                "description": info.msg.description,
                "_id": info.msg._id,
                "time": info.msg.time,
                "image": info.msg.image,
                "viewed": false
            }
            logger.info("info in postTicket", info)

            var con = db.db('englishAcademy')
            con.collection("ticket").insertOne({
                "usrId": info.usrId,
                "supId": 0,
                "status": "open",
                "msg": [info.msg],
                "time": info.time,
                "depId": info.depId
            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    info._id = result.insertedId
                    cb(info)
                }
            })

        }
    })
};

module.exports.editViewToInsert = (info, lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (info.video) {
                con.collection("view").updateMany({"lsnId": new ObjectID(lsnId)}, {
                    $push: {
                        "video": info.video,
                    }
                }, (err, result)=> {
                    if (err) {
                        console.log(err)
                        cb(-1)
                    }
                    else if (result.result.n == 1) {
                        cb(info)

                    }
                    else {
                        cb(0)
                    }
                })
            }

            else {
                con.collection("view").updateMany({"lsnId": new ObjectID(lsnId)}, {
                    $push: {
                        "sound": info.sound,
                    }
                }, (err, result)=> {
                    if (err) {
                        console.log(err)
                        cb(-1)
                    }
                    else if (result.result.n == 1) {
                        cb(info)

                    }
                    else {
                        cb(0)
                    }
                })
            }

        }
    })
};

module.exports.closeTkt = (pass, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("ticket").updateMany({time: {$lt: pass}}, {
                $set: {
                    "status": "close"
                }
            }, (err, result)=> {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result.result.n == 1) {
                    cb(info)

                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.editViewTosetTrue = (id, usrId, type, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (type == 'sound') {
                con.collection("view").findOneAndUpdate({
                        "usrId": new ObjectID(usrId),
                        "sound._id": new ObjectID(id)
                    }, {$set: {"sound.$.viewed": true}},
                    {returnOriginal: false},
                    (err, result)=> {
                        if (err) {
                            console.log("updateView db Error", err)
                            cb(-1)
                        }
                        else if (result.value != null) {
                            cb(result.value)

                        }
                        else {
                            cb(0)
                        }
                    }
                )
            }
            else {
                con.collection("view").findOneAndUpdate({"usrId": new ObjectID(usrId), "video._id": new ObjectID(id)}, {
                        $set: {
                            "video.$.viewed": true
                        }
                    }, {returnOriginal: false}
                    , (err, result)=> {
                        if (err) {
                            console.log("updateView db Error", err);
                            cb(-1)
                        }
                        else if (result.value != null) {
                            cb(result.value)

                        }
                        else {
                            cb(0)
                        }
                    })
            }

        }
    })
};

module.exports.editTrick = (info, trckId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("trick").findOneAndUpdate({"_id": new ObjectID(trckId)}, {
                    $set: {
                        "title": info.title,
                        "text": info.text,
                        "url": info.url,
                        "srtUrl": info.srtUrl,
                        "thumbUrl": info.thumbUrl,
                        "order": info.order
                    }
                }, {returnOriginal: false}
                , (err, result)=> {
                    if (err) {
                        console.log("updateView db Error", err);
                        cb(-1)
                    }
                    else if (result.value != null) {
                        cb(result.value)

                    }
                    else {
                        cb(0)
                    }
                })


        }
    })
};

module.exports.editTypeOfTicket = (info, depId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("ticketType").findOneAndUpdate({"_id": new ObjectID(depId)}, {
                    $set: {
                        "title": info.title,
                    }
                }, {returnOriginal: false}
                , (err, result)=> {
                    if (err) {
                        console.log("updateView db Error", err);
                        cb(-1)
                    }
                    else if (result.value != null) {
                        cb(result.value)

                    }
                    else {
                        cb(0)
                    }
                })


        }
    })
};

module.exports.editTicket = (info, tktId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (info.usrId != undefined && info.usrId != "") {
                info.usrId = new ObjectID(`${info.usrId}`)
            }
            if (info.supId != 0 && info.supId != "" && info.supId != undefined) {
                info.supId = new ObjectID(`${info.supId}`)
            }
            // if (info.newMsg) {
            //     for(var i=0;i<info.msg.length;i++){
            //         if(info.msg[i]._id == undefined){
            //                 info.msg._id = new ObjectID()
            //         }
            //     }
            //
            // }
            if (info.depId != undefined && info.depId != "") {
                info.depId = new ObjectID(info.depId)
            }
            if (info.msg != undefined && info.msg != "") {
                info.msg._id = new ObjectID(info.msg._id)
            }
            // info.msg = {
            //     "sender": info.msg.sender,
            //     "title": info.msg.title,
            //     "description": info.msg.description,
            //     "_id": info.msg._id,
            //     "time": info.msg.time,
            //     "image": info.msg.image
            // }
            logger.info("info in update ticket", info)
            con.collection("ticket").findOneAndUpdate({"_id": new ObjectID(tktId)}, {
                    $set: {
                        "usrId": info.usrId,
                        "supId": info.supId,
                        "status": info.status,
                        "msg": info.msg,
                        "time": info.time,
                        "depId": info.depId

                    }
                }, {returnOriginal: false}
                , (err, result)=> {
                    if (err) {
                        console.log("updateView db Error", err);
                        cb(-1)
                    }
                    else if (result.value != null) {
                        cb(result.value)

                    }
                    else {
                        cb(0)
                    }
                })


        }
    })
};

module.exports.editViewByUsrId = (info, usrId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (info.viewPermission == undefined) {
                info.viewPermission = false
            }
            var con = db.db('englishAcademy')
            con.collection("view").updateOne({"usrId": new ObjectID(usrId)}, {
                $set: {
                    "lsnId": info.lsnId,
                    "video": info.video,
                    "sound": info.sound,
                    "viewPermission": info.viewPermission
                }
            }, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.result.n == 1) {
                    cb(info)

                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.postType = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (info.category.value) {
                info.category.value = new ObjectID(info.category.value)
            }
            con.collection("type").insertOne({
                "title": info.title,
                "category": info.category
            }, (err, result) => {
                if (err != null) {
                    if (err.code == 11000) {
                        cb(-2)
                    }
                }
                else {
                    if (err) {
                        cb(-1)
                    }
                    else if (result.length == 0) {
                        cb(0)
                    }
                    else {
                        cb(result.insertedId)
                    }
                }

            })

        }
    })
};

module.exports.postTypeOfTicket = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("ticketType").insertOne({
                "title": info.title,
            }, (err, result) => {
                if (err != null) {
                    if (err.code == 11000) {
                        cb(-2)
                    }
                }
                else {
                    if (err) {
                        cb(-1)
                    }
                    else if (result.length == 0) {
                        cb(0)
                    }
                    else {
                        cb(result.insertedId)
                    }
                }

            })

        }
    })
};

module.exports.postCategory = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("category").insertOne({
                "title": info.title
            }, (err, result) => {
                if (err != null) {
                    if (err.code == 11000) {
                        cb(-2)
                    }
                }
                else {
                    if (err) {
                        cb(-1)
                    }
                    else if (result.length == 0) {
                        cb(0)
                    }
                    else {
                        cb(result.insertedId)
                    }
                }

            })

        }
    })
};

module.exports.postResult = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("result").insertOne({
                "usrId": info.usrId,
                "lsnId": info.lsnId,
                "passedLesson": info.passedLesson,
                "timePassed": "",
                "quiz": info.quiz,
                "exam": info.exam,
                "round": false

            }, (err, result) => {

                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }


            })

        }
    })
};

module.exports.editLevel = (info, lvlId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof info.order == "string") {
                info.order = parseInt(info.order)
            }
            var con = db.db('englishAcademy')

            con.collection("level").updateOne({"_id": new ObjectID(lvlId)}, {
                $set: {
                    "title": info.title,
                    "description": info.description,
                    "avatarUrl": info.avatarUrl,
                    "order": info.order
                }
            }, (err, result)=> {
                if (err != null) {
                    if (err.code == 11000) {
                        var field = err.errmsg.split('index:')[1]
// now we have `title_1 dup key`
                        field = field.split(' dup key')[0]
                        field = field.substring(0, field.lastIndexOf('_'))
                        if (field == " title") {
                            cb(-2)
                        }
                        else {
                            cb(-3)
                        }
                    }
                }
                else if (err) {
                    cb(-1)
                }
                else if (result.result.n == 1) {
                    cb(info)

                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.editQuestion = (info, QId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (info.lesson.value != undefined && info.lesson.value == "") {
                info.lesson.value = new ObjectID(`${info.lesson.value}`)
            }
            if (info.exam.value != undefined && info.exam.value == "") {
                info.exam.value = new ObjectID(`${info.exam.value}`)
            }
            if (info.typeId != undefined && info.typeId == "") {
                info.typeId = new ObjectID(`${info.typeId}`)
            }

            var con = db.db('englishAcademy')

            con.collection("question").updateOne({"_id": new ObjectID(QId)}, {
                $set: {
                    "content": info.content,
                    "score": info.score,
                    "type": info.type,
                    "typeId": info.typeId,
                    "lesson": info.lesson,
                    "exam": info.exam,
                    "answers": info.answers,
                    "trueIndex": info.trueIndex,
                    "url": info.url
                }
            }, (err, result)=> {
                if (err != null) {
                    if (err.code == 11000) {
                        var field = err.errmsg.split('index:')[1]
// now we have `title_1 dup key`
                        field = field.split(' dup key')[0]
                        field = field.substring(0, field.lastIndexOf('_'))
                        if (field == " title") {
                            cb(-2)
                        }
                        else {
                            cb(-3)
                        }
                    }
                }
                else if (err) {
                    cb(-1)
                }
                else if (result.result.n == 1) {
                    cb(info)

                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.editNotification = (info, NId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {

            var con = db.db('englishAcademy')
            con.collection("notification").updateOne({"_id": new ObjectID(NId)}, {
                $set: {
                    "link": info.link,
                    "avatarUrl": info.avatarUrl,
                    "text": info.text,
                    "title": info.title,
                },
                $addToSet: {
                    "viewedUsers": info.viewedUsers
                }
            }, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.result.n == 1) {
                    cb(info)

                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.deleteLevel = (lvlId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("level").findOneAndDelete({"_id": new ObjectID(`${lvlId}`)}, (err, result)=> {
                console.log(result.lastErrorObject.n)
                if (err) {
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result1 = "row deleted"
                    cb(result1)
                }
                else {
                    cb(0)
                }
            })

        }
    })
};

module.exports.deleteQuestion = (QId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("question").findOneAndDelete({"_id": new ObjectID(`${QId}`)}, (err, result)=> {
                console.log(result.lastErrorObject.n)
                if (err) {
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result1 = "row deleted"
                    cb(result1)
                }
                else {
                    cb(0)
                }
            })

        }
    })
};

module.exports.delTypeOfTicket = (depId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("ticketType").findOneAndDelete({"_id": new ObjectID(`${depId}`)}, (err, result)=> {
                console.log(result.lastErrorObject.n)
                if (err) {
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result1 = "row deleted"
                    cb(result1)
                }
                else {
                    cb(0)
                }
            })

        }
    })
};

module.exports.deleteNotification = (NId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("notification").findOneAndDelete({"_id": new ObjectID(`${NId}`)}, (err, result)=> {
                console.log(result.lastErrorObject.n)
                if (err) {
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result1 = "row deleted"
                    cb(result1)
                }
                else {
                    cb(0)
                }
            })

        }
    })
};

module.exports.deleteExam = (exId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("exam").findOneAndDelete({"_id": new ObjectID(`${exId}`)}, (err, result)=> {
                console.log(result.lastErrorObject.n)
                if (err) {
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result1 = "row deleted"
                    cb(result1)
                }
                else {
                    cb(0)
                }
            })

        }
    })
};

module.exports.getLvlById = (lvlID, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            console.log(lvlID)
            con.collection("level").findOne({"_id": new ObjectID(`${lvlID}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getExamByLsnId = (lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            console.log("lsnId", lsnId)
            con.collection("exam").findOne({"preLesson.value": new ObjectID(`${lsnId}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getNotifById = (NId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("notification").findOne({"_id": new ObjectID(`${NId}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getQstById = (QId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("question").findOne({"_id": new ObjectID(`${QId}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getTypeById = (typeId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("type").findOne({"_id": new ObjectID(`${typeId}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getExamQuestion = (exId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("question").find({
                "exam.value": new ObjectID(`${exId}`),
                "type": "exam"
            }).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getQuizByLesson = (lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("question").find({
                "lesson.value": new ObjectID(`${lsnId}`),
                "type": "quiz"
            }).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getQuestionScCntByLsn = (lsnId, exId, cb)=> {
    console.log("examId", exId)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (exId == 0) {
                con.collection('question').aggregate([
                    {
                        $match: {"lesson.value": new ObjectID(`${lsnId}`)}
                    },
                    {
                        $group: {
                            _id: "$type",
                            totalScore: {$sum: "$score"},
                            count: {$sum: 1}
                        }
                    }
                ]).toArray((err, result) => {
                    console.log("result", result)
                    if (err) {
                        cb(-1)
                    }
                    else if (result == null) {
                        cb(0)
                    }
                    else {
                        cb(result)
                    }
                })
            }

            else {
                con.collection('question').aggregate(
                    [
                        {
                            $match: {$or: [{"exam.value": new ObjectID(`${exId}`)}, {"lesson.value": new ObjectID(`${lsnId}`)}]}
                        },
                        {
                            $group: {
                                _id: "$type",
                                totalScore: {$sum: "$score"},
                                count: {$sum: 1}
                            }
                        }
                    ]
                ).toArray((err, result) => {
                    console.log("result in geTcOunt", result)
                    if (err) {
                        cb(-1)
                    }
                    else if (result == null) {
                        cb(0)
                    }
                    else {
                        cb(result)
                    }
                })
            }

        }
    })
};

module.exports.getExById = (exId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("exam").findOne({"_id": new ObjectID(`${exId}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getLsnById = (lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("lesson").aggregate([
                {$match: {"_id": new ObjectID(`${lsnId}`)}},
                {
                    $lookup: {
                        from: "video",
                        localField: "_id",
                        foreignField: "lsnId",
                        as: "video"


                    }
                },

                {
                    $lookup: {
                        from: "level",
                        localField: "lvlId",
                        foreignField: "_id",
                        as: "level"
                    }
                }
                ,

                {
                    $lookup: {
                        from: "sound",
                        localField: "_id",
                        foreignField: "lsnId",
                        as: "sound"
                    }

                },
                {
                    $lookup: {
                        from: "text",
                        localField: "_id",
                        foreignField: "lsnId",
                        as: "text"


                    }
                },
            ]).toArray((err, result) => {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getResultByLsnIdUsrId = (usrId, lsnId, cb)=> {
    console.log(usrId)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("result").findOne({
                "lsnId": new ObjectID(`${lsnId}`),
                "usrId": new ObjectID(`${usrId}`),
                "passedLesson": false
            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getResultByUsrId = (usrId, cb)=> {
    console.log(usrId)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("result").find({
                "usrId": new ObjectID(`${usrId}`),
                "examTimePassed": {$ne: null}
            }).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getLsnLvlById = (lvlID, cb)=> {
    console.log("lvlId", lvlID)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (typeof lvlID == 'number') {
                lvlID = lvlID + ''
            }
            con.collection("lesson").find({"lvlId": new ObjectID(`${lvlID}`)}).sort({order: 1}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllNotes = (lsnId, usrId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (typeof lsnId == 'number') {
                lsnId = lsnId + ''
            }
            con.collection("note").find({
                "lsnId": new ObjectID(`${lsnId}`),
                "usrId": new ObjectID(`${usrId}`)
            }).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getTrickBYTrickId = (trckId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("trick").find({"_id": new ObjectID(`${trckId}`)}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getFrstLsn = (lvlID, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (typeof lvlID == 'number') {
                lvlID = lvlID + ''
            }
            con.collection("lesson").find({"lvlId": new ObjectID(`${lvlID}`)}).sort({"order": 1}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result[0])
                }
            })

        }
    })
};

module.exports.getFrstLvl = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("level").find().sort({"order": 1}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getLsnLvlByLsnId = (lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            console.log(lsnId)
            con.collection("lesson").aggregate([
                {
                    $lookup: {
                        from: "level",
                        localField: "lvlId",
                        foreignField: "_id",
                        as: "level"
                    }
                },
                {$match: {"_id": new ObjectID(`${lsnId}`)}},
                {
                    $addFields: {
                        level: {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: $level,
                                        as: "level",
                                        cond: {
                                            $eq: ["_id", new ObjectID(`${lsnId}`)]
                                        }
                                    }
                                }, 0
                            ]
                        }
                    }
                }
            ]).toArray((err, result) => {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })
        }
    })
};

module.exports.getLvlByOrder = (order, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("level").find({"order": order}).toArray((err, result) => {
                console.log("result", result)
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getLsnByOrder = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("lesson").find({
                "order": info.lastPassOrder,
                "lvlId": new ObjectID(`${info.lvlId}`)
            }).toArray((err, result) => {
                console.log("result", result)
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getUsrByUsrname = (username, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("student").find({"username": username}).toArray((err, result) => {
                console.log("result", result)
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getVideoById = (vdId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("video").aggregate([
                {$match: {"_id": new ObjectID(`${vdId}`)}},
                {
                    $lookup: {
                        from: "lesson",
                        localField: "lsnId",
                        foreignField: "_id",
                        as: "lesson"
                    }
                },

                {
                    $lookup: {
                        from: "type",
                        localField: "typeId",
                        foreignField: "_id",
                        as: "type"
                    }

                }]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })
        }
    })
};

module.exports.getSoundById = (sndId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("sound").aggregate([
                {$match: {"_id": new ObjectID(`${sndId}`)}},
                {
                    $lookup: {
                        from: "lesson",
                        localField: "lsnId",
                        foreignField: "_id",
                        as: "lesson"
                    }
                },

                {
                    $lookup: {
                        from: "type",
                        localField: "typeId",
                        foreignField: "_id",
                        as: "type"
                    }

                }]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })
        }
    })
};

module.exports.getSoundByLsn = (lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("sound").find({"lsnId": new ObjectID(`${lsnId}`)}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })


        }
    })
};

module.exports.getVideoByLsn = (lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("video").find({"lsnId": new ObjectID(`${lsnId}`)}).toArray((err, result) => {
                console.log("result", result)
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllLevels = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("level").find().toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getTkts = (depId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("ticket").aggregate([
                {$match: {"depId": new ObjectID(`${depId}`)}},
                {
                    $lookup: {
                        from: "student",
                        localField: "usrId",
                        foreignField: "_id",
                        as: "student"
                    }
                },
            ]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllNotifications = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("notification").find().sort({_id: -1}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllTrickes = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("trick").find().toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.postAdmin = (adminInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("admins").insertOne({
                "name": adminInfo.name,
                "username": adminInfo.username,
                "password": adminInfo.password
            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postSupporter = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (info.department != undefined && info.department != "") {
                info.department = new ObjectID(info.department)
            }
            var con = db.db('englishAcademy')
            con.collection("supporter").insertOne({
                "name": info.name,
                "username": info.username,
                "password": info.password,
                "avatarUrl": info.avatarUrl,
                "department": info.department
            }, (err, result) => {
                if (err) {

                    if (err.code == 11000) {
                        console.log(err)
                        cb(-2)
                    }
                    else {
                        cb(-1)
                    }

                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postText = (textInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            textInfo.lsnId = new ObjectID(`${textInfo.lsnId}`)
            textInfo.typeId = new ObjectID(`${textInfo.typeId}`)

            var con = db.db('englishAcademy')
            con.collection("text").insertOne({
                "title": textInfo.title,
                "description": textInfo.description,
                "lsnId": textInfo.lsnId,
                "typeId": textInfo.typeId
            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postNote = (noteInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            noteInfo.lsnId = new ObjectID(`${noteInfo.lsnId}`)
            noteInfo.typeId = new ObjectID(`${noteInfo.typeId}`)
            noteInfo.usrId = new ObjectID(`${noteInfo.usrId}`)


            var con = db.db('englishAcademy')
            con.collection("note").insertOne({
                "content": noteInfo.content,
                "lsnId": noteInfo.lsnId,
                "typeId": noteInfo.typeId,
                "usrId": noteInfo.usrId
            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.getAllAdmins = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("admins").find().toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllSupporters = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("supporter").aggregate([
                {
                    $lookup: {
                        from: "ticketType",
                        localField: "department",
                        foreignField: "_id",
                        as: "department"
                    }
                },
            ]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.editAdmin = (info, admId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            let infor = {
                "name": info.name,
                "username": info.username,
                "password": info.password
            }
            con.collection("admins").updateOne({"_id": new ObjectID(admId)}, {
                $set: infor
            }, (err, result)=> {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else {

                    cb(result)
                }
            })
        }
    })
};

module.exports.editSupporter = (info, supId, cb)=> {
    logger.info("info", info)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (info.department != undefined && info.department != "") {
                info.department = new ObjectID(info.department._id)
            }
            var con = db.db('englishAcademy')
            let infor = {
                "name": info.name,
                "username": info.username,
                "password": info.password,
                "avatarUrl": info.avatarUrl,
                "department": info.department


            }
            con.collection("supporter").findOneAndUpdate({"_id": new ObjectID(supId)}, {
                $set: infor
            }, {returnOriginal: false}, (err, result)=> {
                if (err) {
                    if (err.code == 11000) {
                        console.log(err)
                        cb(-2)
                    }
                    else {
                        console.log(err)
                        cb(-1)
                    }
                }
                else {

                    cb(result.value)
                }
            })
        }
    })
};

module.exports.editChatAdmin = (info, caId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {

            var con = db.db('englishAcademy')
            let infor = {
                "name": info.name,
                "username": info.username,
                "password": info.password,
                "avatarUrl": info.avatarUrl,
                "chatrooms": info.chatrooms
            }
            con.collection("chatAdmin").findOneAndUpdate({"_id": new ObjectID(caId)}, {
                $set: infor
            }, {returnOriginal: false}, (err, result)=> {
                if (err) {
                    if (err.code == 11000) {
                        console.log(err)
                        cb(-2)
                    }
                    else {
                        console.log(err)
                        cb(-1)
                    }
                }
                else {

                    cb(result.value)
                }
            })
        }
    })
};

module.exports.getAllChatAdmins = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("chatAdmin").find({}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.postChatAdmin = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (info.chatrooms != undefined) {
                // if(typeof info.chatrooms == "string"){
                //     info.chatrooms == JSON.parse(info.chatRooms)
                // }
                for (var i = 0; i < info.chatrooms.length; i++) {
                    info.chatrooms.value = new ObjectID(info.chatrooms.value)
                }
            }
            var con = db.db('englishAcademy')
            con.collection("chatAdmin").insertOne({
                "name": info.name,
                "username": info.username,
                "password": info.password,
                "avatarUrl": info.avatarUrl,
                "chatrooms": info.chatrooms
            }, (err, result) => {
                if (err) {

                    if (err.code == 11000) {
                        console.log(err)
                        cb(-2)
                    }
                    else {
                        cb(-1)
                    }

                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.deleteChatAdmin = (caId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("chatAdmin").findOneAndDelete({"_id": new ObjectID(`${caId}`)}, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result = "row deleted"
                    cb(result)
                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.getChatAdmnById = (caId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof caId == 'number') {
                caId = JSON.stringify(caId)
            }
            if (caId == 0) {
                caId = 0
            }
            else {
                caId = new ObjectID(`${caId}`)
            }
            var con = db.db('englishAcademy')
            con.collection("chatAdmin").findOne({"_id": caId}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    // result = result[0]
                    // result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};


module.exports.editText = (info, txtId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (info.lsnId) {
                info.lsnId = new ObjectID(info.lsnId)
            }
            if (info.typeId) {
                info.typeId = new ObjectID(info.typeId)
            }
            con.collection("text").findOneAndUpdate({"_id": new ObjectID(txtId)}, {
                    $set: {
                        "title": info.title,
                        "description": info.description,
                        "typeId": info.typeId,
                        "lsnId": info.lsnId

                    }
                },
                {returnOriginal: false}, (err, result)=> {
                    if (err) {
                        console.log(err)
                        cb(-1)
                    }
                    else {

                        cb(result)
                    }
                })
        }
    })
};

module.exports.editNote = (info, ntId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (info.lsnId) {
                info.lsnId = new ObjectID(info.lsnId)
            }
            if (info.typeId) {
                info.typeId = new ObjectID(info.typeId)
            }
            if (info.usrId) {
                info.usrId = new ObjectID(info.usrId)
            }

            con.collection("note").findOneAndUpdate({"_id": new ObjectID(ntId)}, {
                    $set: {
                        "content": info.content,
                        "typeId": info.typeId,
                        "lsnId": info.lsnId,
                        "usrId": info.usrId

                    }
                },
                {returnOriginal: false}, (err, result)=> {
                    if (err) {
                        console.log(err)
                        cb(-1)
                    }
                    else {

                        cb(result.value)
                    }
                })
        }
    })
};

module.exports.editResult = (usrId, lsnId, info, cb)=> {
    logger.info("editResultInfo in mongo file", info)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (info.Score) {
                if (info.exam.permission == undefined) {
                    info.exam.permission = false
                }
                if (info.type == "quiz") {
                    con.collection("result").findOneAndUpdate({
                            "lsnId": new ObjectID(lsnId),
                            "usrId": new ObjectID(usrId)
                        }, {
                            $inc: {
                                "quiz.questionTrue": info.quiz.questionTrue,
                                "quiz.getScore": info.quiz.newScore
                            }
                            , $set: {
                                "timePassed": info.timePassed,
                                "round": info.round,
                                "exam.permission": info.exam.permission
                            }
                        },
                        {
                            returnOriginal: false
                        }
                        ,
                        (err, result)=> {
                            if (err) {
                                console.log(err)
                                cb(-1)
                            }
                            else {

                                cb(result.value)
                            }
                        }
                    )
                }
                else {
                    con.collection("result").findOneAndUpdate({
                            "lsnId": new ObjectID(lsnId),
                            "usrId": new ObjectID(usrId)
                        }, {
                            $inc: {
                                "exam.questionTrue": info.exam.questionTrue,
                                "exam.getScore": info.exam.newScore
                            }
                            , $set: {
                                "examTimePassed": info.examTimePassed,
                                "examRound": info.examRound
                            }
                        },
                        {returnOriginal: false}, (err, result)=> {
                            if (err) {
                                console.log(err)
                                cb(-1)
                            }
                            else {

                                cb(result.value)
                            }
                        })
                }

            }
            else if (lsnId == 0) {
                console.log("hey in lsnId =0")

                con.collection("result").findOneAndUpdate({
                        "lsnId": lsnId,
                        "usrId": new ObjectID(usrId)
                    }, {
                        $set: {
                            "usrId": info.usrId,
                            "lsnId": info.lsnId,
                            "passedLesson": info.passedLesson,
                            "timePassed": info.timePassed,
                            "quiz": info.quiz,
                            "exam": info.exam,
                            "round": info.round
                        }
                    },
                    {returnOriginal: false}, (err, result)=> {
                        if (err) {
                            console.log(err)
                            cb(-1)
                        }
                        else if (result.lastErrorObject.n == 0) {
                            con.collection("result").findOneAndUpdate({
                                    "lsnId": new ObjectID(info.lsnId),
                                    "usrId": new ObjectID(usrId)
                                }, {
                                    $set: {
                                        "usrId": info.usrId,
                                        "lsnId": info.lsnId,
                                        "passedLesson": info.passedLesson,
                                        "timePassed": info.timePassed,
                                        "quiz": info.quiz,
                                        "exam": info.exam,
                                        "round": info.round
                                    }
                                },
                                {returnOriginal: false}, (err, result)=> {
                                    if (err) {
                                        console.log(err)
                                        cb(-1)
                                    }
                                    else {

                                        cb(result)
                                    }
                                })
                        }
                        else {
                            logger.info("jere", result)
                            cb(result)
                        }
                    })
            }
            else {
                console.log("hey in else")
                con.collection("result").findOneAndUpdate({
                        "lsnId": new ObjectID(lsnId),
                        "usrId": new ObjectID(usrId)
                    }, {
                        $set: {
                            "usrId": info.usrId,
                            "lsnId": info.lsnId,
                            "passedLesson": info.passedLesson,
                            "timePassed": info.timePassed,
                            "quiz": info.quiz,
                            "exam": info.exam,
                            "round": info.round
                        }
                    },
                    {returnOriginal: false}, (err, result)=> {
                        if (err) {
                            console.log(err)
                            cb(-1)
                        }
                        else {

                            cb(result)
                        }
                    })
            }

        }
    })
};

module.exports.deleteAdmin = (admId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            module.exports.getAllAdmins((admins)=> {
                if (admins == -1) {
                    cb(-1)
                }
                else {
                    let count = admins.length
                    if (count <= 1) {
                        cb(-4)
                    }
                    else {
                        con.collection("admins").findOneAndDelete({"_id": new ObjectID(`${admId}`)}, (err, result)=> {
                            if (err) {
                                cb(-1)
                            }
                            else if (result.lastErrorObject.n != 0) {
                                let result = "row deleted"
                                cb(result)
                            }
                            else {
                                cb(0)
                            }
                        })
                    }
                }
            })

        }
    })
};

module.exports.deleteSupporter = (supId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("supporter").findOneAndDelete({"_id": new ObjectID(`${supId}`)}, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result = "row deleted"
                    cb(result)
                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.deleteTrick = (trckId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("trick").findOneAndDelete({"_id": new ObjectID(`${trckId}`)}, (err, result)=> {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else {
                    let result = "row deleted";
                    cb(result)
                }
            })


        }
    })

};

module.exports.deleteNote = (ntId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("note").findOneAndDelete({"_id": new ObjectID(`${ntId}`)}, (err, result)=> {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else {
                    let result = "row deleted";
                    cb(result)
                }
            })


        }
    })

};

module.exports.deleteLesson = (lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("lesson").findOneAndDelete({"_id": new ObjectID(`${lsnId}`)}, (err, result)=> {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else {
                    let result = "row deleted";
                    cb(result)
                }
            })


        }
    })
};

module.exports.deleteStudent = (stuId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("student").findOneAndDelete({"_id": new ObjectID(`${stuId}`)}, (err, result)=> {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else {
                    let result = "row deleted";
                    cb(result)
                }
            })

        }
    })
};

module.exports.postLesson = (lessonInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof lessonInfo.order == "string") {
                lessonInfo.order = parseInt(lessonInfo.order)
            }
            if (typeof lessonInfo.deadline == "string") {
                lessonInfo.deadline = parseInt(lessonInfo.deadline)
            }

            var con = db.db('englishAcademy')
            lessonInfo.lvlId = new ObjectID(`${lessonInfo.lvlId}`)
            con.collection("lesson").insertOne({
                "title": lessonInfo.title,
                "lvlId": lessonInfo.lvlId,
                "deadline": lessonInfo.deadline,
                "description": lessonInfo.description,
                "order": lessonInfo.order,
                "avatarUrl": lessonInfo.avatarUrl
            }, (err, result) => {

                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postCertification = (certInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            certInfo.usrId = new ObjectID(`${certInfo.usrId}`)
            con.collection("certification").insertOne({
                "time": certInfo.time,
                "firstName": certInfo.firstName,
                "lastName": certInfo.lastName,
                "zipCode": certInfo.zipCode,
                "address": certInfo.address,
                "IDCard": certInfo.IDCard,
                "personalImg": certInfo.personalImg,
                "status": "pending",
                "usrId": certInfo.usrId
            }, (err, result) => {

                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postVideo = (videoInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            videoInfo.lvlId = new ObjectID(`${videoInfo.lvlId}`)
            videoInfo.lsnId = new ObjectID(`${videoInfo.lsnId}`)
            videoInfo.typeId = new ObjectID(`${videoInfo.typeId}`)
            console.log(videoInfo.srtUrl, "srtUrl")
            if (videoInfo.srtUrl == undefined) {
                videoInfo.srtUrl = ""
            }
            con.collection("video").insertOne({
                "title": videoInfo.title,
                "typeId": videoInfo.typeId,
                "url": videoInfo.url,
                "thumbUrl": videoInfo.thumbUrl,
                "lsnId": videoInfo.lsnId,
                "order": videoInfo.order,
                "lvlId": videoInfo.lvlId,
                "text": videoInfo.text,
                "srtUrl": videoInfo.srtUrl

            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postTrick = (trickInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            if (trickInfo.srtUrl == undefined) {
                trickInfo.srtUrl = ""
            }
            con.collection("trick").insertOne({
                "title": trickInfo.title,
                "text": trickInfo.text,
                "url": trickInfo.url,
                "srtUrl": trickInfo.srtUrl,
                "thumbUrl": trickInfo.thumbUrl,
                "order": trickInfo.order

            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.postSound = (soundInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            soundInfo.lvlId = new ObjectID(`${soundInfo.lvlId}`)
            soundInfo.lsnId = new ObjectID(`${soundInfo.lsnId}`)
            soundInfo.typeId = new ObjectID(`${soundInfo.typeId}`)

            con.collection("sound").insertOne({
                "title": soundInfo.title,
                "typeId": soundInfo.typeId,
                "url": soundInfo.url,
                "lsnId": soundInfo.lsnId,
                "order": soundInfo.order,
                "lvlId": soundInfo.lvlId,
                "text": soundInfo.text,
                "coverUrl": soundInfo.coverUrl

            }, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.editLesson = (info, lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof info.order == "string") {
                info.order = parseInt(info.order)
            }
            var con = db.db('englishAcademy')
            info.lvlId = new ObjectID(`${info.lvlId}`)
            con.collection("lesson").updateOne({"_id": new ObjectID(lsnId)}, {
                $set: {
                    "title": info.title,
                    "deadline": info.deadline,
                    "lvlId": info.lvlId,
                    "order": info.order,
                    "avatarUrl": info.avatarUrl

                }
            }, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.result.n == 1) {
                    console.log("updated")
                    cb(info)
                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.editVideo = (videoInfo, vdId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            videoInfo.lvlId = new ObjectID(`${videoInfo.lvlId}`)
            videoInfo.lsnId = new ObjectID(`${videoInfo.lsnId}`)
            videoInfo.typeId = new ObjectID(`${videoInfo.typeId}`)
            con.collection("video").updateOne({"_id": new ObjectID(vdId)}, {
                $set: {
                    "title": videoInfo.title,
                    "typeId": videoInfo.typeId,
                    "url": videoInfo.url,
                    "thumbUrl": videoInfo.thumbUrl,
                    "lsnId": videoInfo.lsnId,
                    "order": videoInfo.order,
                    "lvlId": videoInfo.lvlId,
                    "text": videoInfo.text,
                    "srtUrl": videoInfo.srtUrl

                }
            }, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.result.n == 1) {
                    cb(videoInfo)
                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.editSound = (info, sndId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            info.lvlId = new ObjectID(`${info.lvlId}`)
            info.lsnId = new ObjectID(`${info.lsnId}`)
            info.typeId = new ObjectID(`${info.typeId}`)

            con.collection("sound").updateOne({"_id": new ObjectID(sndId)}, {
                $set: {
                    "title": info.title,
                    "typeId": info.typeId,
                    "url": info.url,
                    "lsnId": info.lsnId,
                    "lvlId": info.lvlId,
                    "order": info.order,
                    "coverUrl": info.coverUrl

                }
            }, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.result.n == 1) {
                    cb(info)
                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.delLesson = (lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("lesson").findOneAndDelete({"_id": new ObjectID(`${lsnId}`)})
            setTimeout(() => {
                let result = "row deleted"
                cb(result)
            }, 1)

        }
    })
};

module.exports.delVideo = (vdId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("video").findOneAndDelete({"_id": new ObjectID(`${vdId}`)})
            setTimeout(() => {
                let result = "row deleted";
                cb(result)
            }, 1)

        }
    })
};

module.exports.delSound = (sndId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("sound").findOneAndDelete({"_id": new ObjectID(`${sndId}`)})
            setTimeout(() => {
                let result = "row deleted";
                cb(result)
            }, 1)

        }
    })
};

module.exports.getVDByLVLLSN = (lvlID, lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (typeof lvlID == 'number') {
                lvlID = (lvlID) + ''
            }
            if (typeof lsnId == 'number') {
                lsnId = (lsnId) + ''
            }
            con.collection("video").find({
                "lvlId": new ObjectID(`${lvlID}`),
                "lsnId": new ObjectID(`${lsnId}`)
            }).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getSNDByLVLLSN = (lvlID, lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("sound").find({
                "lvlId": new ObjectID(`${lvlID}`),
                "lsnId": new ObjectID(`${lsnId}`)
            }).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.postStudent = (stuInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (stuInfo.score && typeof stuInfo.score == "string") {
                stuInfo.score = parseInt(stuInfo.score)
            }
            con.collection("student").insertOne({
                "username": stuInfo.username,
                "password": stuInfo.password,
                "fname": stuInfo.fname,
                "lname": stuInfo.lname,
                "mobile": stuInfo.mobile,
                "avatarUrl": stuInfo.avatarUrl,
                "score": stuInfo.score,
                "lastPassedLesson": stuInfo.lastPassedLesson,
                "passedLessonScore": stuInfo.passedLessonScore,
                "chatrooms": []

            }, (err, result) => {
                if (err != null) {
                    if (err.code == 11000) {
                        cb(-2)
                    }
                }

                else if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.getStudentById = (stdId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof stdId == 'number') {
                stdId = parseInt(stdId)
            }
            var con = db.db('englishAcademy')
            con.collection("student").findOne({"_id": new ObjectID(`${stdId}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getStudentByLesson = (lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (lsnId == 0) {
                lsnId = 0
            }
            else {
                lsnId = new ObjectID(`${lsnId}`)
            }
            con.collection("view").aggregate([
                {$match: {"lsnId": lsnId}},
                {
                    $lookup: {
                        from: "student",
                        localField: "usrId",
                        foreignField: "_id",
                        as: "student"
                    }

                },
                {
                    $lookup: {
                        from: "lesson",
                        localField: "lsnId",
                        foreignField: "_id",
                        as: "lesson"
                    }

                }]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getCertById = (certId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("certification").findOne({"_id": new ObjectID(`${certId}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getDepartmentById = (depId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("ticketType").findOne({"_id": new ObjectID(`${depId}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getTxtById = (textId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {

            var con = db.db('englishAcademy')
            con.collection("text").aggregate([
                {$match: {"_id": new ObjectID(`${textId}`)}},
                {
                    $lookup: {
                        from: "lesson",
                        localField: "lsnId",
                        foreignField: "_id",
                        as: "lesson"
                    }
                },

                {
                    $lookup: {
                        from: "type",
                        localField: "typeId",
                        foreignField: "_id",
                        as: "type"
                    }

                }]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllStudents = (cb)=> {
    console.log("here")
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {

            var con = db.db('englishAcademy')
            con.collection("student").aggregate([
                {
                    $lookup: {
                        from: "lesson",
                        let: {lsnId: "$lastPassedLesson"},
                        pipeline: [
                            {
                                "$match": {
                                    "$expr": {"$eq": ["$_id", "$$lsnId"]},
                                }
                            }
                        ],
                        as: "lesson"
                    }
                },
                {
                    $lookup: {
                        from: "level",
                        localField: "lesson.lvlId",
                        foreignField: "_id",
                        as: "level"
                    }
                }


            ]).sort({score: 1}).toArray((err, result) => {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.editStudent = (stuInfo, stdId, cb)=> {
    if (stuInfo.setAvatar == true) {
        MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
            if (err) {
                console.log("Err", err)
                cb(-1)
            }
            else {
                var con = db.db('englishAcademy')
                con.collection("student").updateOne({"_id": new ObjectID(stdId)}, {
                    $set: {
                        avatarUrl: stuInfo.avatarUrl
                    }
                }, (err, result)=> {
                    if (err) {
                        cb(-1)
                    }
                    else {
                        cb(stuInfo)
                    }
                })
            }
        })

    }
    else {
        MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
            if (err) {
                console.log("Err", err)
                cb(-1)
            }
            else {
                var con = db.db('englishAcademy')
                con.collection("student").findOneAndUpdate({"_id": new ObjectID(stdId)}, {
                        $set: {
                            "username": stuInfo.username,
                            "password": stuInfo.password,
                            "fname": stuInfo.fname,
                            "lname": stuInfo.lname,
                            "mobile": stuInfo.mobile,
                            "avatarUrl": stuInfo.avatarUrl,
                            "score": stuInfo.score,
                            "lastPassedLesson": stuInfo.lastPassedLesson,
                            "passedLessonScore": stuInfo.passedLessonScore,
                            "chatrooms": stuInfo.chatrooms
                        }
                    },
                    {returnOriginal: false}
                    , (err, result)=> {
                        if (err != null) {
                            if (err.code == 11000) {
                                cb(-2)
                            }
                        }

                        else if (err) {
                            console.log(err)
                            cb(-1)
                        }
                        else {
                            console.log(result)
                            cb(result.value)
                        }
                    })
            }
        })

    }
};

module.exports.editCertification = (certInfo, certId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (certInfo.usrId) {
                certInfo.usrId = new ObjectID(`${certInfo.usrId}`)

            }
            con.collection("certification").findOneAndUpdate({"_id": new ObjectID(certId)}, {
                    $set: {
                        "time": certInfo.time,
                        "firstName": certInfo.firstName,
                        "lastName": certInfo.lastName,
                        "zipCode": certInfo.zipCode,
                        "address": certInfo.address,
                        "IDCard": certInfo.IDCard,
                        "personalImg": certInfo.personalImg,
                        "status": certInfo.status,
                        "usrId": certInfo.usrId
                    }
                },
                {returnOriginal: false}
                , (err, result)=> {
                    if (err) {
                        console.log(err)
                        cb(-1)
                    }
                    else {
                        console.log(result)
                        cb(result.value)
                    }
                })
        }
    })
};

module.exports.getAdmById = (admId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof admId == 'number') {
                admId = JSON.stringify(admId)
            }
            var con = db.db('englishAcademy')
            con.collection("admins").findOne({"_id": new ObjectID(`${admId}`)}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getSupById = (supId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof supId == 'number') {
                supId = JSON.stringify(supId)
            }
            if (supId == 0) {
                supId = 0
            }
            else {
                supId = new ObjectID(`${supId}`)
            }
            var con = db.db('englishAcademy')
            con.collection("supporter").aggregate([
                {$match: {"_id": supId}},
                {
                    $lookup: {
                        from: "ticketType",
                        localField: "department",
                        foreignField: "_id",
                        as: "department"
                    }
                },
            ]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    result = result[0]
                    result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};

module.exports.deleteVideo = (vdId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("video").findOneAndDelete({"_id": new ObjectID(`${vdId}`)}, (err, result)=> {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result1 = "row deleted"
                    cb(result1)
                }
                else {
                    cb(0)
                }
            })


        }
    })
};

module.exports.deleteText = (txtId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("text").findOneAndDelete({"_id": new ObjectID(`${txtId}`)}, (err, result)=> {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result1 = "row deleted"
                    cb(result1)
                }
                else {
                    cb(0)
                }
            })


        }
    })
};

module.exports.deleteSound = (sndId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("sound").findOneAndDelete({"_id": new ObjectID(`${sndId}`)}, (err, result)=> {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else {
                    let result = "row deleted";
                    cb(result)
                }
            })


        }
    })
};

module.exports.getAllLess = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("lesson").aggregate([{
                $lookup: {
                    from: "level",
                    localField: "lvlId",
                    foreignField: "_id",
                    as: "level"
                }
            }]).toArray((err, result) => {
                console.log("result", result)
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllTypes = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("type").find({}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllTicketTypes = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("ticketType").find({}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllCerts = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("certification").find({}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllCategories = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("category").find({}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllVids = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("video").aggregate([{
                $lookup: {
                    from: "lesson",
                    localField: "lsnId",
                    foreignField: "_id",
                    as: "lesson"
                }
            },

                {
                    $lookup: {
                        from: "type",
                        localField: "typeId",
                        foreignField: "_id",
                        as: "type"
                    }

                }]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllTexts = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("text").aggregate([{
                $lookup: {
                    from: "lesson",
                    localField: "lsnId",
                    foreignField: "_id",
                    as: "lesson"
                }
            },

                {
                    $lookup: {
                        from: "type",
                        localField: "typeId",
                        foreignField: "_id",
                        as: "type"
                    }

                }]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllSnds = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("sound").aggregate([{
                $lookup: {
                    from: "lesson",
                    localField: "lsnId",
                    foreignField: "_id",
                    as: "lesson"
                }
            },

                {
                    $lookup: {
                        from: "type",
                        localField: "typeId",
                        foreignField: "_id",
                        as: "type"
                    }

                }]).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllQuestions = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("question").find({}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getAllExams = (usrId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (usrId != 0) {
                con.collection("exam").aggregate([
                    {
                        $lookup: {
                            from: "result",
                            let: {exaId: "$_id"},
                            pipeline: [
                                {
                                    "$match": {
                                        "$expr": {
                                            "$and": [
                                                {"$eq": ["$exam.exId", "$$exaId"]},
                                                {"usrId": new ObjectID(`${usrId}`)}
                                            ]
                                        }
                                    }
                                }
                                // { $project: { stock_item: 0, _id: 0 } }
                            ],
                            as: "result"
                        }
                    },
                    {
                        $lookup: {
                            from: "lesson",
                            localField: "preLesson.value",
                            foreignField: "_id",
                            as: "lesson"
                        }
                        ,

                    }
                ]).toArray((err, result) => {
                    if (err) {
                        console.log(err)
                        cb(-1)
                    }
                    else if (result == null) {
                        cb(0)
                    }
                    else {
                        console.log("result", result)
                        cb(result)
                    }
                })
            }
            else {
                con.collection("exam").find({}).toArray((err, result) => {
                    if (err) {
                        console.log(err)
                        cb(-1)
                    }
                    else if (result == null) {
                        cb(0)
                    }
                    else {
                        console.log("result", result)
                        cb(result)
                    }
                })
            }


        }
    })
};

module.exports.getStudentByLevel = (lvlId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("student").aggregate([
                {
                    $group: {
                        _id: {$_id: "$lvlId"},

                    }
                },
                {
                    $sort: {score: 1}
                },
            ]).toArray((err, result) => {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.getSndByType = (typeId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof typeId == 'number') {
                typeId = JSON.stringify(typeId)
            }
            var con = db.db('englishAcademy')
            con.collection("sound").find({"typeId": new ObjectID(`${typeId}`)}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
}

module.exports.getVDByType = (typeId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof typeId == 'number') {
                typeId = JSON.stringify(typeId)
            }
            var con = db.db('englishAcademy')
            con.collection("video").find({"typeId": new ObjectID(`${typeId}`)}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
}

module.exports.getViewByUsrId = (usrId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("view").find({"usrId": new ObjectID(`${usrId}`)}).toArray((err, result) => {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
}

module.exports.getCertByUsrId = (usrId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("certification").find({"usrId": new ObjectID(`${usrId}`)}).toArray((err, result) => {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
}

module.exports.deleteType = (typeId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("type").findOneAndDelete({"_id": new ObjectID(`${typeId}`)}, (err, result)=> {
                if (err) {
                    console.log(err)
                    cb(-1)
                }
                else {
                    let result = "row deleted";
                    cb(result)
                }
            })


        }
    })
};

module.exports.editChatRoom = (info, chId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (!Object.keys(info.lesson).length == 0) {
                info.lesson.value = new ObjectID(info.lesson.value)
            }
            else if (!Object.keys(info.level).length == 0) {
                info.level.value = new ObjectID(info.level.value)
            }
            if(typeof info.startTime == "string" ){
                info.startTime = parseInt(info.startTime)
            }
            if(typeof info.endTime == "string" ){
                info.endTime = parseInt(info.endTime)
            }
            if(info.avatarUrl == undefined){
                info.avatarUrl == ""
            }
            var con = db.db('englishAcademy')
            let infor = {
                "title": info.title,
                "lesson": info.lesson,
                "avatarUrl": info.avatarUrl,
                "level": info.level,
                "startTime":info.startTime,
                "endTime":info.endTime
            }
            con.collection("chatRoom").findOneAndUpdate({"_id": new ObjectID(chId)}, {
                $set: infor
            }, {returnOriginal: false}, (err, result)=> {
                if (err) {
                    if (err.code == 11000) {
                        console.log(err)
                        cb(-2)
                    }
                    else {
                        console.log(err)
                        cb(-1)
                    }
                }
                else {

                    cb(result.value)
                }
            })
        }
    })
};

module.exports.getAllChatrooms = (cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')

            con.collection("chatRoom").find({}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })

        }
    })
};

module.exports.postChatRoom = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {

            if (!Object.keys(info.lesson).length == 0) {
                info.lesson.value = new ObjectID(info.lesson.value)
            }
            else if (!Object.keys(info.level).length == 0) {
                info.level.value = new ObjectID(info.level.value)
            }
            if(typeof info.startTime == "string" ){
                info.startTime = parseInt(info.startTime)
            }
            if(typeof info.endTime == "string" ){
                info.endTime = parseInt(info.endTime)
            }
            if(info.avatarUrl == undefined){
                info.avatarUrl == ""
            }
            var con = db.db('englishAcademy')
            con.collection("chatRoom").insertOne({
                "title": info.title,
                "lesson": info.lesson,
                "avatarUrl": info.avatarUrl,
                "level": info.level,
                "startTime":info.startTime,
                "endTime":info.endTime
            }, (err, result) => {
                if (err) {

                    if (err.code == 11000) {
                        console.log(err)
                        cb(-2)
                    }
                    else {
                        cb(-1)
                    }

                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    cb(result.insertedId)
                }
            })

        }
    })
};

module.exports.deleteChatRoom = (chId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("chatRoom").findOneAndDelete({"_id": new ObjectID(`${chId}`)}, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result = "row deleted"
                    cb(result)
                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.getChatrmById = (chId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof chId == 'number') {
                chId = JSON.stringify(chId)
            }
            chId = new ObjectID(`${chId}`)
            var con = db.db('englishAcademy')
            con.collection("chatRoom").findOne({"_id": chId}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    // result = result[0]
                    // result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};

module.exports.getusersOfChatroom = (chId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof chId == 'number') {
                chId = JSON.stringify(chId)
            }
            chId = new ObjectID(`${chId}`)
            var con = db.db('englishAcademy')
            con.collection("student").find({chatrooms:{$elemMatch: {"_id":chId}}}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    // result = result[0]
                    // result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};


module.exports.getChatrmBylsnId = (lsnId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof lsnId == 'number') {
                lsnId = JSON.stringify(lsnId)
            }
            lsnId = new ObjectID(`${lsnId}`)
            var con = db.db('englishAcademy')
            con.collection("chatRoom").findOne({"lesson.value": lsnId}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    // result = result[0]
                    // result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};

module.exports.getChatrmByLvlId = (lvlId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof lvlId == 'number') {
                lvlId = JSON.stringify(lvlId)
            }
            lvlId = new ObjectID(`${lvlId}`)
            var con = db.db('englishAcademy')
            con.collection("chatRoom").findOne({"level.value": lvlId}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    // result = result[0]
                    // result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};
//no need
module.exports.getChatRoomByChtAdmn = (caId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof caId == 'number') {
                caId = JSON.stringify(caId)
            }
            if (caId == 0) {
                caId = 0
            }
            else {
                caId = new ObjectID(`${caId}`)
            }
            var con = db.db('englishAcademy')
            con.collection("chatAdmin").findOne({"_id": caId}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    // result = result[0]
                    // result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};



module.exports.editMessage = (info, msgId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (info.user._id ) {
                info.user._id = new ObjectID(info.user._id)
            }
            if (info.chId ) {
                info.chId = new ObjectID(info.chId)
            }
            var con = db.db('englishAcademy')
            let infor = {
                "msg": info.msg,
                "user": info.user,
                "chId": info.chId,
                "pinned": info.pinned,
                "warned":info.warned,
                "marked":info.marked,
                "time":info.time
            }
            con.collection("message").findOneAndUpdate({"_id": new ObjectID(msgId)}, {
                $set: infor
            }, {returnOriginal: false}, (err, result)=> {
                if (err) {
                    if (err.code == 11000) {
                        console.log(err)
                        cb(-2)
                    }
                    else {
                        console.log(err)
                        cb(-1)
                    }
                }
                else {

                    cb(result.value)
                }
            })
        }
    })
};

module.exports.postMessage = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (info.user._id ) {
                info.user._id = new ObjectID(info.user._id)
            }
            if (info.chId ) {
                info.chId = new ObjectID(info.chId)
            }
            var con = db.db('englishAcademy')
            con.collection("message").insertOne({
                "msg": info.msg,
                "user":info.user,
                "chId": info.chId,
                "pinned": false,
                "warned":false,
                "marked":false,
                "time":info.time
            }, (err, result) => {
                if (err) {

                    if (err.code == 11000) {
                        console.log(err)
                        cb(-2)
                    }
                    else {
                        cb(-1)
                    }

                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                   // let  data = result
                   //  data._id = result.insertedId
                    logger.info("result" , result.ops[0])
                    cb(result.ops[0])
                }
            })

        }
    })
};

module.exports.deletechatRoomMessages = (chId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("message").findOneAndDelete({"chId": new ObjectID(`${chId}`)}, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result = "row deleted"
                    cb(result)
                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.deleteMsgById = (msgId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("message").findOneAndDelete({"_id": new ObjectID(`${msgId}`)}, (err, result)=> {
                if (err) {
                    cb(-1)
                }
                else if (result.lastErrorObject.n != 0) {
                    let result = "row deleted"
                    cb(result)
                }
                else {
                    cb(0)
                }
            })
        }
    })
};

module.exports.getMessageById = (msgId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof msgId == 'number') {
                msgId = JSON.stringify(msgId)
            }
            msgId = new ObjectID(`${msgId}`)
            var con = db.db('englishAcademy')
            con.collection("message").findOne({"_id": msgId}, (err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    // result = result[0]
                    // result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};

module.exports.getMessagOfChatroom = (chId, cb)=> {
    logger.info("chId",chId)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof chId == 'number') {
                chId = JSON.stringify(chId)
            }
            chId = new ObjectID(`${chId}`)
            var con = db.db('englishAcademy')
            con.collection("message").find({"chId":chId}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    // result = result[0]
                    // result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};

module.exports.getMarkChat = (chId, cb)=> {
    logger.info("chId",chId)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof chId == 'number') {
                chId = JSON.stringify(chId)
            }
            chId = new ObjectID(`${chId}`)
            var con = db.db('englishAcademy')
            con.collection("message").find({"chId": chId , "marked":true}).toArray((err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result.length == 0) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    // result = result[0]
                    // result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};

module.exports.getPinChat = (chId, cb)=> {
    logger.info("chId",chId)
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            if (typeof chId == 'number') {
                chId = JSON.stringify(chId)
            }
            chId = new ObjectID(`${chId}`)
            var con = db.db('englishAcademy')
            con.collection("message").findOne({"chId": chId , "pinned":true},(err, result) => {
                if (err) {
                    cb(-1)
                }
                else if (result == null) {
                    cb(0)
                }
                else {
                    logger.info("result", result)
                    // result = result[0]
                    // result.department = result.department[0]


                    cb(result)
                }
            })

        }
    })
};



