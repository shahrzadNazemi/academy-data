let mongo = require('./mongo')


module.exports.loginForAdmin = (loginInfo, cb)=> {
    mongo.adminLogin(loginInfo, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.addLevel = (levelInfo, cb)=> {
    mongo.postLevel(levelInfo, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.updateLevel = (updateInfo, lvlId, cb)=> {
    console.log("data")
    mongo.editLevel(updateInfo, lvlId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.delLevel = (lvlId, cb)=> {
    mongo.deleteLevel(lvlId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.getLevelById = (lvlId, cb)=> {
    mongo.getLvlById(lvlId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })

};

module.exports.getLessonByLvlId = (lvlId, cb)=> {
    mongo.getLsnLvlById(lvlId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })

};

module.exports.getLevels = (cb)=> {
    mongo.getAllLevels((result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.addAdmin = (adminData, cb)=> {
    mongo.postAdmin(adminData, (addedAdmin)=> {
        if (addedAdmin == -1) {
            cb(-1)
        }
        else {
            cb(addedAdmin)
        }
    })
};

module.exports.getAdmins = (cb)=> {
    mongo.getAllAdmins((admins)=> {
        if (admins == -1) {
            cb(-1)
        }
        else if (admins == 0) {
            cb(0)
        }
        else {
            cb(admins)
        }
    })
};

module.exports.getVideoByLVLLSN = (lvlId , lsnId , cb)=> {
    mongo.getVDByLVLLSN(lvlId , lsnId , (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.getSoundByLVLLSN = (lvlId , lsnId , cb)=> {
    mongo.getSNDByLVLLSN(lvlId , lsnId ,(result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.getVdById = (vdId, cb)=> {
    mongo.getVideoById(vdId ,(result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.getSndById = (sndId, cb)=> {
    mongo.getSoundById(sndId ,(result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.updateAdmin = (updateInfo, admId, cb)=> {
    mongo.editAdmin(updateInfo, admId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.delAdmin = (admId, cb)=> {
    mongo.deleteAdmin(admId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.addLesson = (lsnInfo, cb)=> {
    mongo.postLesson(lsnInfo, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.addVideo = (videoInfo, cb)=> {
    mongo.postVideo(videoInfo, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.addSound = (soundInfo, cb)=> {
    mongo.postSound(soundInfo, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.updateLesson = (updateInfo, lsnId, cb)=> {
    mongo.editLesson(updateInfo, lsnId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.updateVideo = (updateInfo, vdId, cb)=> {
    mongo.editVideo(updateInfo, vdId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.updateSound = (updateInfo, sndId, cb)=> {
    mongo.editSound(updateInfo, sndId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.delLesson = (lsnId, cb)=> {
    mongo.deleteLesson(lsnId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.delVideo = (vdId, cb)=> {
    mongo.deleteAdmin(vdId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.delSound = (sndId, cb)=> {
    mongo.deleteAdmin(sndId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.addStudent = (stuData, cb)=> {
    mongo.postStudent(stuData, (addedAdmin)=> {
        if (addedAdmin == -1) {
            cb(-1)
        }
        else {
            cb(addedAdmin)
        }
    })
};







