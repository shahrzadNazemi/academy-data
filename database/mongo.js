let MongoClient = require('mongodb').MongoClient;
let config = require('../util/config')
let ObjectID = require('mongodb').ObjectID;
let assert = require('assert')

module.exports.adminLogin = (loginInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("admins").find({
                adm_password: loginInfo.adm_password,
                adm_username: loginInfo.adm_username
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
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("student").find({
                stu_password: loginInfo.stu_password,
                stu_username: loginInfo.stu_username
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

module.exports.postLevel = (info, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("level").insertOne({
                "lvl_title": info.lvl_title,
                "lvl_description": info.lvl_description
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
                    "lvl_title": info.lvl_title,
                    "lvl_description": info.lvl_description
                }
            } , (err , result)=>{
                console.log("result")
                if(err){
                    cb(-1)
                }
                else{
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
            throw err
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
            con.collection("lesson").find({"lsn_lvlId": lvlID}).toArray((err, result) => {
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
            throw err
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
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("admins").insertOne({
                "adm_name": adminInfo.adm_name,
                "adm_username": adminInfo.adm_username,
                "adm_password": adminInfo.adm_password
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
            throw err
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
                "adm_name": info.adm_name,
                "adm_username": info.adm_username,
                "adm_password": info.adm_password
            }
            con.collection("admins").updateOne({"_id": new ObjectID(admId)}, {
                $set: infor
            }, (err , result)=>{
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
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            module.exports.getAllAdmins((admins)=>{
                if(admins == -1){
                    cb(-1)
                }
                else{
                    let count = admins.length
                    if(count<=1){
                        cb(-4)
                    }
                    else{
                        con.collection("admins").findOneAndDelete({"_id": new ObjectID(`${admId}`)}, ()=>{
                            if(err){
                                cb(-1)
                            }
                            else{
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
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("lesson").findOneAndDelete({"_id": new ObjectID(`${lsnId}`)})
            setTimeout(() => {
                let result = "row deleted";
                cb(result)
            }, 1)

        }
    })
};

module.exports.postLesson = (lessonInfo, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("lesson").insertOne({
                "lsn_title": lessonInfo.lsn_title,
                "lsn_lvlId": lessonInfo.lsn_lvlId,
                "lsn_deadline": lessonInfo.lsn_deadline
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
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("video").insertOne({
                "vd_title": videoInfo.vd_title,
                "vd_type": videoInfo.vd_type,
                "vd_url": videoInfo.vd_url,
                "vd_lsnId": videoInfo.vd_lsnId,
                "vd_order": videoInfo.vd_order,
                "vd_lvlId": videoInfo.vd_lvlId,
                "vd_text":videoInfo.vd_text

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
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("sound").insertOne({
                "snd_title": soundInfo.snd_title,
                "snd_type": soundInfo.snd_type,
                "snd_url": soundInfo.snd_url,
                "snd_lsnId": soundInfo.snd_lsnId,
                "snd_order": soundInfo.snd_order,
                "snd_lvlId": soundInfo.snd_lvlId,
                "snd_text":soundInfo.snd_text

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
                    "lsn_title": info.lsn_title,
                    "lsn_deadline": info.lsn_deadline,
                    "lsn_lvlId": info.lsn_lvlId,

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
                    "vd_title": videoInfo.vd_title,
                    "vd_type": videoInfo.vd_type,
                    "vd_url": videoInfo.vd_url,
                    "vd_lsnId": videoInfo.vd_lsnId,
                    "vd_order": videoInfo.vd_order,
                    "vd_lvlId": videoInfo.vd_lvlId
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
                    "snd_title": info.snd_title,
                    "snd_type": info.snd_type,
                    "snd_url": info.snd_url,
                    "snd_lsnId": info.snd_lsnId,
                    "snd_lvlId": info.snd_lvlId,
                    "snd_order": info.snd_order
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
            throw err
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
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("video").findOneAndDelete({"_id": new ObjectID(`${vdId}`)})
            setTimeout(() => {
               let result = "row deleted";
                cb(result)
            } , 1)

        }
    })
};

module.exports.delSound = (sndId, cb)=> {
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("sound").findOneAndDelete({"_id": new ObjectID(`${sndId}`)})
            setTimeout(() => {
               let result = "row deleted";
                cb(result)
            } ,1)

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
            if(typeof lvlID == 'number'){
                lvlID = (lvlID)+''
            }
            if(typeof lsnId == 'number'){
                lsnId = (lsnId)+''
            }

            con.collection("video").find({"vd_lvlId": lvlID, "vd_lsnId": lsnId}).toArray((err, result) => {
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
            con.collection("sound").find({"snd_lvlId": lvlID, "snd_lsnId": lsnId}).toArray((err, result) => {
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
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("student").insertOne({
                "stu_username": stuInfo.stu_username,
                "stu_password": stuInfo.stu_password,
                "stu_fname" : stuInfo.stu_fname,
                "stu_lname" : stuInfo.stu_lname,
                "stu_mobile" : stuInfo.stu_mobile,
                "stu_avatarUrl" : stuInfo.stu_avatarUrl,
                "stu_score" : stuInfo.stu_score,
                "stu_lastPassedLesson" : stuInfo.stu_lastPassedLesson
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
            if(typeof stdId == 'number'){
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
            con.collection("student").find().sort( { stu_score: 1 } ).toArray((err, result) => {
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
    MongoClient.connect(config.mongoURL, {useNewUrlParser: true}, (err, db)=> {
        if (err) {
            console.log("Err", err)
            cb(-1)
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("student").updateOne({"_id": new ObjectID(stdId)}, {
                $set: {
                   stu_password:stuInfo.stu_password
                }
            } , (err , result)=>{
                if(err){
                    cb(-1)
                }
                else{
                    cb(stuInfo)
                }
            })
        }
    })
};


















