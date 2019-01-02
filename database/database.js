let mongo = require('./mongo')
let mongoose = require('./mongoose')


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

module.exports.loginForStudent = (loginInfo, cb)=> {
    mongo.studentLogin(loginInfo, (result)=> {
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
        else if (result == -2) {
            cb(-2)
        }
        else if (result == -3) {
            cb(-3)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.addQuestion = (QInfo, cb)=> {
    mongo.postQuestion(QInfo, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == -2) {
            cb(-2)
        }
        else if (result == -3) {
            cb(-3)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.addType = (typeInfo, cb)=> {
    mongo.postType(typeInfo, (result)=> {
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
    mongo.editLevel(updateInfo, lvlId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == -2) {
            cb(-2)
        }
        else if (result == -3) {
            cb(-3)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            cb(result)
        }
    })
};

module.exports.getQuestionById = (QId , cb)=>{
    mongo.getQstById(QId , (question)=>{
        if(question == -1){
            cb(-1)
        }
        else if(question == 0){
            cb(0)
        }
        else{
            cb(question)
        }
    })
}

module.exports.updateQuestion = (updateInfo, QId, cb)=> {
    module.exports.getQuestionById(QId, (question)=> {
        if (question == -1) {
            cb(-1)
        }
        else if (question == 0) {
            cb(0)
        }
        else {
            var newQuestion = Object.assign({}, question,updateInfo)
            mongo.editQuestion(newQuestion, QId, (result)=> {
                if (result == -1) {
                    cb(-1)
                }
                else if (result == -2) {
                    cb(-2)
                }
                else if (result == -3) {
                    cb(-3)
                }
                else if (result == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            })
        }
    })
};

module.exports.delLevel = (lvlId, cb)=> {
    module.exports.getLessonByLvlId(lvlId, (lesson)=> {
        if (lesson == -1) {
            cb(-1)
        }
        else if (lesson == 0) {
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
        }
        else {
            cb(-3)
        }
    })

};

module.exports.delQuestion = (QId, cb)=> {
            mongo.deleteQuestion(QId, (result)=> {
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

module.exports.getLessonById = (lsnId, cb)=> {
    mongo.getLsnById(lsnId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            module.exports.getAllTpe((type)=> {
                var k = 0
                for (var i = 0; i < result[0].video.length; i++) {
                    for (k = 0; k < type.length; k++) {
                        if (result[0].video[i].typeId.equals(type[k]._id)) {
                            result[0].video[i].type = type[k]
                        }
                    }

                }
                k = 0
                console.log(type[1]._id)
                console.log(result[0].sound[0].typeId)
                console.log(result[0].sound[0].typeId.equals(type[1]._id))


                if (result[0].sound[0].typeId === type[1]._id) {

                    console.log('equals');

                }


                for (var i = 0; i < result[0].sound.length; i++) {
                    for (k = 0; k < type.length; k++) {
                        if (result[0].sound[i].typeId.equals(type[k]._id)) {
                            result[0].sound[i].type = type[k]
                        }

                    }

                }

                cb(result)

            })
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

module.exports.getVideoByLVLLSN = (lvlId, lsnId, cb)=> {
    mongo.getVDByLVLLSN(lvlId, lsnId, (result)=> {
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

module.exports.getSoundByLVLLSN = (lvlId, lsnId, cb)=> {
    mongo.getSNDByLVLLSN(lvlId, lsnId, (result)=> {
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
    mongo.getVideoById(vdId, (result)=> {
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
    mongo.getSoundById(sndId, (result)=> {
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
        else if (result == -4) {
            cb(-4)
        }
        else {
            cb(result)
        }
    })
};

module.exports.delStudent = (stuId, cb)=> {
    mongo.deleteStudent(stuId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else if (result == -4) {
            cb(-4)
        }
        else {
            cb(result)
        }
    })
};

module.exports.addLesson = (lsnInfo, cb)=> {
    module.exports.getLessonByLvlId(lsnInfo.lvlId, (lesson)=> {
        if (lesson == -1) {
            cb(-1)
        }
        else if (lesson == 0) {
            mongo.postLesson(lsnInfo, (result)=> {
                if (result == -1) {
                    cb(-1)
                }
                else if (result == -2) {
                    cb(-2)
                }
                else if (result == -3) {
                    cb(-3)
                }
                else if (result == 0) {
                    cb(0)
                }
                else {
                    cb(result)
                }
            });

        }
        else {
            let forbidden = false
            let forbidden1 = false
            for (var i = 0; i < lesson.length; i++) {
                if (lesson[i].order == lsnInfo.order) {
                    forbidden = true
                }
                else if (lesson[i].title == lsnInfo.title) {
                    forbidden1 = true
                }

            }
            if (forbidden) {
                cb(-3)
            }
            else if (forbidden1) {
                cb(-2)
            }
            else {
                mongo.postLesson(lsnInfo, (result)=> {
                    if (result == -1) {
                        cb(-1)
                    }
                    else if (result == -2) {
                        cb(-2)
                    }
                    else if (result == -3) {
                        cb(-3)
                    }
                    else if (result == 0) {
                        cb(0)
                    }
                    else {
                        cb(result)
                    }
                });
            }

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
    module.exports.getLessonByLvlId(updateInfo.lvlId, (lesson)=> {
        if (lesson == -1) {
            cb(-1)
        }
        else if (lesson == 0) {
            cb(0)
        }
        else {
            let forbidden = false
            let forbidden1 = false
            console.log(lesson)
            for (var i = 0; i < lesson.length; i++) {
                if (lesson[i].order == updateInfo.order) {
                    if (lesson[i]._id != lsnId)
                        forbidden1 = true
                }
                else if (lesson[i].title == updateInfo.title) {
                    if (lesson[i]._id != lsnId)
                        forbidden = true
                }
            }
            if (forbidden1) {
                cb(-3)
            }
            else if (forbidden) {
                cb(-2)
            }
            else {
                mongo.editLesson(updateInfo, lsnId, (result)=> {
                    if (result == -1) {
                        cb(-1)
                    }
                    else if (result == -2) {
                        cb(-2)
                    }
                    else if (result == -3) {
                        cb(-3)
                    }
                    else if (result == 0) {
                        cb(0)
                    }
                    else {
                        cb(result)
                    }
                });
            }

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
    module.exports.getViDByLsnId(lsnId, (vd)=> {
        if (vd == -1) {
            cb(-1)
        }
        else if (vd == 0) {
            module.exports.getSndByLsnId(lsnId, (snd)=> {

                if (snd == -1) {
                    cb(-1)
                }
                else if (snd == 0) {
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
                }
                else {
                    cb(-2)
                }
            })
        }
        else {
            cb(-3)
        }
    })

};

module.exports.getViDByLsnId = (lsnId, cb)=> {
    mongo.getVideoByLsn(lsnId, (videos)=> {
        if (videos == -1) {
            cb(-1)
        }
        else if (videos == 0) {
            cb(0)
        }
        else {
            cb(videos)
        }
    })
}

module.exports.getSndByLsnId = (lsnId, cb)=> {
    mongo.getSoundByLsn(lsnId, (sounds)=> {
        if (sounds == -1) {
            cb(-1)
        }
        else if (sounds == 0) {
            cb(0)
        }
        else {
            cb(sounds)
        }
    })
}

module.exports.delVideo = (vdId, cb)=> {
    mongo.deleteVideo(vdId, (result)=> {
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
    mongo.deleteSound(sndId, (result)=> {
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

module.exports.getStuById = (stdId, cb)=> {
    mongo.getStudentById(stdId, (result)=> {
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

module.exports.getAllStu = (cb)=> {
    mongo.getAllStudents((result)=> {
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

module.exports.updateStudent = (updateInfo, stdId, cb)=> {
    mongo.editStudent(updateInfo, stdId, (result)=> {
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

module.exports.getAdminById = (admId, cb)=> {
    mongo.getAdmById(admId, (result)=> {
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

module.exports.getStuByLevel = (lvlId, cb)=> {
    mongo.getStudentByLevel(lvlId, (result)=> {
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

module.exports.getAllLessons = (cb)=> {
    mongo.getAllLess((result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else if (result == -2) {
            cb(-2)
        }
        else {
            cb(result)
        }
    })
};

module.exports.getAllVideos = (cb)=> {
    mongo.getAllVids((result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else if (result == -2) {
            cb(-2)
        }
        else {
            cb(result)
        }
    })
};

module.exports.getAllSounds = (cb)=> {
    mongo.getAllSnds((result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else if (result == -2) {
            cb(-2)
        }
        else {
            cb(result)
        }
    })
};

module.exports.getAllTpe = (cb)=> {
    mongo.getAllTypes((result)=> {
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

module.exports.getVideoByType = (typeId, cb)=> {
    mongo.getVDByType(typeId, (video)=> {
        if (video == -1) {
            cb(-1)
        }
        else if (video == 0) {
            cb(0)
        }
        else {
            cb(video)
        }
    })
}

module.exports.getSoundByType = (typeId, cb)=> {
    mongo.getSndByType(typeId, (sound)=> {
        if (sound == -1) {
            cb(-1)
        }
        else if (sound == 0) {
            cb(0)
        }
        else {
            cb(sound)
        }
    })
}

module.exports.delType = (typeId, cb)=> {
    module.exports.getVideoByType(typeId, (video)=> {
        if (video == -1) {
            cb(-1)
        }
        else if (video == 0) {
            module.exports.getSoundByType(typeId, (sound)=> {
                if (sound == -1) {
                    cb(-1)
                }
                else if (sound == 0) {
                    mongo.deleteType(typeId, (type)=> {
                        if (type == -1) {
                            cb(-1)
                        }
                        else {
                            cb(type)
                        }
                    })
                }
                else {
                    cb(-3)
                }
            })
        }
        else {
            cb(-2)
        }
    })
}

module.exports.getFirstLesson = (cb) => {
    module.exports.getFirstLevel(level=> {
        console.log(level)
        if (level == -1) {
            cb(-1)
        }
        else if (level == 0) {
            cb(0)
        }
        else {
            mongo.getFrstLsn(level._id, lesson=> {

                if (lesson == -1) {
                    cb(-1)
                }
                else if (lesson == 0) {
                    cb(0)
                }
                else {
                    lesson.level = level
                    console.log(lesson)
                    console.log("lesson", lesson)
                    cb(lesson)
                }
            })

        }
    })
}

module.exports.getFirstLevel = (cb) => {
    mongo.getFrstLvl(level=> {
        if (level == -1) {
            cb(-1)
        }
        else if (level == 0) {
            cb(0)
        }
        else {
            cb(level[0])
        }
    })
}

module.exports.getLessonLevel = (lsnId, cb)=> {
    mongo.getLsnLvlByLsnId(lsnId, (lesson)=> {
        if (lesson == -1) {
            cb(-1)
        }
        else if (lesson == 0) {
            cb(0)
        }
        else {
            cb(lesson)
        }
    })
}

module.exports.getLevelByOrder = (order, cb)=> {
    mongo.getLvlByOrder(order, (level)=> {
        if (level == -1) {
            cb(-1)
        }
        else if (level == 0) {
            cb(0)
        }
        else {
            cb(level)
        }
    })
}

module.exports.getLessonByOrder = (order, cb)=> {
    mongo.getLsnByOrder(order, (level)=> {
        if (level == -1) {
            cb(-1)
        }
        else if (level == 0) {
            cb(0)
        }
        else {
            cb(level)
        }
    })
}

module.exports.getStuByUsername = (username, cb)=> {
    mongo.getUsrByUsrname(username, (user)=> {
        if (user == -1) {
            cb(-1)
        }
        else if (user == 0) {
            cb(0)
        }
        else {
            cb(user)
        }
    })
}

module.exports.stuPlacement = (placeInfo, cb)=> {
    if (placeInfo.lsnId == 0) {
        module.exports.getFirstLesson((lesson)=> {
            if (lesson == -1) {
                cb(-1)
            }
            else if (lesson == 0) {
                cb(0)
            }
            else {
                console.log("lesson", lesson)
                cb(lesson)
            }
        })
    }
    else {

        module.exports.getLessonById(placeInfo.lsnId, (lesson)=> {
            if (lesson == -1) {
                cb(-1)
            }
            else if (lesson == 0) {
                cb(0)
            }
            else {
                module.exports.getLevelById(lesson.lvlId, (level)=> {
                    if (level == -1) {
                        cb(-1)
                    }
                    else if (level == 0) {
                        cb(0)
                    }
                    else {
                        if (lesson.order == 1) {
                            let newOrder = level.order - 1
                            if (newOrder != 0) {
                                module.exports.getLevelByOrder(newOrder, (levels)=> {
                                    if (levels == -1) {
                                        cb(-1)
                                    }
                                    else if (levels == 0) {
                                        cb(0)
                                    }
                                    else {
                                        module.exports.getLessonByLvlId(levels[0]._id, (lessons)=> {
                                            if (lessons == -1) {
                                                cb(-1)
                                            }
                                            else if (lessons == 0) {
                                                cb(0)
                                            }
                                            else {
                                                let lesson1 = lessons[lessons.length - 1]
                                                lesson.level = level
                                                module.exports.getStuByUsername(placeInfo.username, (student)=> {
                                                    if (student == -1) {
                                                        cb(-1)
                                                    }
                                                    else if (student == 0) {
                                                        cb(0)
                                                    }
                                                    else {
                                                        let stu = {}
                                                        stu.lastPassedLesson = lesson1._id
                                                        let newStudent = Object.assign({}, student[0], stu)
                                                        module.exports.updateStudent(newStudent, student[0]._id, (result)=> {
                                                            if (result == -1) {
                                                                cb(-1)
                                                            }
                                                            else if (result == 0) {
                                                                cb(0)
                                                            }
                                                            else {
                                                                cb(lesson)
                                                            }
                                                        })
                                                    }

                                                })
                                            }
                                        })
                                    }
                                })
                            }
                            else {
                                let info = {lsnId: 0}
                                module.exports.stuPlacement(info, (lesson)=> {
                                    if (lesson == -1) {
                                        cb(-1)
                                    }
                                    else if (lesson == 0) {
                                        cb(0)
                                    }
                                    else {
                                        cb(lesson)
                                    }
                                })
                            }
                        }
                        else {
                            let info = {}
                            info.lastPassOrder = lesson.order - 1
                            info.lvlId = lesson.lvlId
                            module.exports.getLessonByOrder(info, (lastPassedLesson)=> {
                                if (lastPassedLesson == -1) {
                                    cb(-1)
                                }
                                else if (lastPassedLesson == 0) {
                                    cb(0)
                                }
                                else {

                                    module.exports.getStuByUsername(placeInfo.username, (student)=> {
                                        if (student == -1) {
                                            cb(-1)
                                        }
                                        else if (student == 0) {
                                            cb(0)
                                        }
                                        else {
                                            let stu = {}
                                            stu.lastPassedLesson = lastPassedLesson[0]._id
                                            let newStudent = Object.assign({}, student[0], stu)
                                            console.log("new", newStudent)
                                            module.exports.updateStudent(newStudent, student[0]._id, (result)=> {
                                                if (result == -1) {
                                                    cb(-1)
                                                }
                                                else if (result == 0) {
                                                    cb(0)
                                                }
                                                else {
                                                    lesson.level = level
                                                    cb(lesson)
                                                }
                                            })
                                        }

                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    }
};








