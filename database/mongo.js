let MongoClient = require('mongodb').MongoClient;
let config = require('../util/config')

module.exports.adminLogin = (loginInfo, cb)=> {
    var query = {$and: [{adm_password:loginInfo.password} , {adm_username:loginInfo.username}] }
    MongoClient.connect(config.mongoURL,{ useNewUrlParser: true }, (err, db)=> {
        if (err) {
            console.log("Err" , err)
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("admins").find({password:loginInfo.password ,adm_username:loginInfo.username }).toArray((err, result) => {
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
    MongoClient.connect(config.mongoURL,{ useNewUrlParser: true }, (err, db)=> {
        if (err) {
            console.log("Err" , err)
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("level").insertOne({info},(err, result) => {
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

module.exports.editLevel = (loginInfo, cb)=> {
    var query = {$and: [{adm_password:loginInfo.password} , {adm_username:loginInfo.username}] }
    MongoClient.connect(config.mongoURL,{ useNewUrlParser: true }, (err, db)=> {
        if (err) {
            console.log("Err" , err)
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("admins").find({password:loginInfo.password ,adm_username:loginInfo.username }).toArray((err, result) => {
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

module.exports.deleteLevel = (loginInfo, cb)=> {
    var query = {$and: [{adm_password:loginInfo.password} , {adm_username:loginInfo.username}] }
    MongoClient.connect(config.mongoURL,{ useNewUrlParser: true }, (err, db)=> {
        if (err) {
            console.log("Err" , err)
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("admins").find({password:loginInfo.password ,adm_username:loginInfo.username }).toArray((err, result) => {
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

module.exports.getLvlById = (lvlID, cb)=> {
    MongoClient.connect(config.mongoURL,{ useNewUrlParser: true }, (err, db)=> {
        if (err) {
            console.log("Err" , err)
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("level").find({_id:`ObjectId(${lvlID})`}).toArray((err, result) => {
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

module.exports.getAllLevels = (loginInfo, cb)=> {
    var query = {$and: [{adm_password:loginInfo.password} , {adm_username:loginInfo.username}] }
    MongoClient.connect(config.mongoURL,{ useNewUrlParser: true }, (err, db)=> {
        if (err) {
            console.log("Err" , err)
            throw err
        }
        else {
            var con = db.db('englishAcademy')
            con.collection("admins").find({password:loginInfo.password ,adm_username:loginInfo.username }).toArray((err, result) => {
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

