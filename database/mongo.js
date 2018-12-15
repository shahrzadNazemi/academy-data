let MongoClient = require('mongodb').MongoClient;
let config = require('../util/config')
let ObjectID = require('mongodb').ObjectID;
let assert = require('assert')

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
                    cb(0)
                }
                else {
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
            var con = db.db('englishAcademy')
            con.collection("level").insertOne({
                "title": info.title,
                "description": info.description
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
            var con = db.db('englishAcademy')
            con.collection("level").updateOne({"_id": new ObjectID(lvlId)}, {
                $set: {
                    "title": info.title,
                    "description": info.description
                }
            }, (err, result)=> {
                console.log("result")
                if (err) {
                    cb(-1)
                }
                else {
                    cb(info)
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
            console.log(lvlId)
            var con = db.db('englishAcademy')
            con.collection("level").findOneAndDelete({"_id": new ObjectID(`${lvlId}`)})
            setTimeout(() => {
                let result = "row deleted"
                cb(result)

            }, 1)

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

module.exports.getLsnLvlById = (lvlID, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            if (typeof lvlID == 'string') {
                lvlID = parseInt(lvlID)
            }
            con.collection("lesson").find({"lvlId": lvlID}).toArray((err, result) => {
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
            con.collection("video").findOne({"_id": new ObjectID(`${vdId}`)}, (err, result) => {
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

module.exports.getSoundById = (sndId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("sound").findOne({"_id": new ObjectID(`${sndId}`)}, (err, result) => {
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

                    cb(info)
                }
            })
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
                        con.collection("admins").findOneAndDelete({"_id": new ObjectID(`${admId}`)}, ()=> {
                            if (err) {
                                cb(-1)
                            }
                            else {
                                let result = "row deleted"
                                cb(result)
                            }
                        })
                    }
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
            var con = db.db('englishAcademy')

            lessonInfo.lvlId = new ObjectID(`${lessonInfo.lvlId}`)
            con.collection("lesson").insertOne({
                "title": lessonInfo.title,
                "lvlId": lessonInfo.lvlId,
                "deadline": lessonInfo.deadline
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

module.exports.postVideo = (videoInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("video").insertOne({
                "title": videoInfo.title,
                "type": videoInfo.type,
                "url": videoInfo.url,
                "lsnId": videoInfo.lsnId,
                "order": videoInfo.order,
                "lvlId": videoInfo.lvlId,
                "text": videoInfo.text

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
            con.collection("sound").insertOne({
                "title": soundInfo.title,
                "type": soundInfo.type,
                "url": soundInfo.url,
                "lsnId": soundInfo.lsnId,
                "order": soundInfo.order,
                "lvlId": soundInfo.lvlId,
                "text": soundInfo.text

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
            var con = db.db('englishAcademy')
            con.collection("lesson").updateOne({"_id": new ObjectID(lsnId)}, {
                $set: {
                    "title": info.title,
                    "deadline": info.deadline,
                    "lvlId": info.lvlId,

                }
            })
            setTimeout(() => {
                cb(info)
            }, 1)


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
            con.collection("video").updateOne({"_id": new ObjectID(vdId)}, {
                $set: {
                    "title": videoInfo.title,
                    "type": videoInfo.type,
                    "url": videoInfo.url,
                    "lsnId": videoInfo.lsnId,
                    "order": videoInfo.order,
                    "lvlId": videoInfo.lvlId
                }
            })
            setTimeout(() => {
                cb(videoInfo)
            }, 1)
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
            con.collection("sound").updateOne({"_id": new ObjectID(sndId)}, {
                $set: {
                    "title": info.title,
                    "type": info.type,
                    "url": info.url,
                    "lsnId": info.lsnId,
                    "lvlId": info.lvlId,
                    "order": info.order
                }
            })
            setTimeout(() => {
                cb(info)
            }, 1)
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

            con.collection("video").find({"lvlId": lvlID, "lsnId": lsnId}).toArray((err, result) => {
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
            con.collection("sound").find({"lvlId": lvlID, "lsnId": lsnId}).toArray((err, result) => {
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
            con.collection("student").insertOne({
                "username": stuInfo.username,
                "password": stuInfo.password,
                "fname": stuInfo.fname,
                "lname": stuInfo.lname,
                "mobile": stuInfo.mobile,
                "avatarUrl": stuInfo.avatarUrl,
                "score": stuInfo.score,
                "lastPassedLesson": stuInfo.lastPassedLesson
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

module.exports.getAllStudents = (cb)=> {
    console.log("here")
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {

            var con = db.db('englishAcademy')
            con.collection("student").find().sort({score: 1}).toArray((err, result) => {
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
                con.collection("student").updateOne({"_id": new ObjectID(stdId)}, {
                    $set: {
                        password: stuInfo.password
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
};

module.exports.getAdmById = (admId, cb)=> {
    console.log(admId)
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
                else {
                    let result = "row deleted";
                    cb(result)
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





















