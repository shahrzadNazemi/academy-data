let mongo = require('./mongo')
let mongoose = require('./mongoose')
let logger = require('../util/logger')
let moment = require('moment')
let ObjectID = require('mongodb').ObjectID;
let smsPanel = require('../util/smsPanel')


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

module.exports.addTicket = (tktInfo, cb)=> {
    mongo.postTicket(tktInfo, (result)=> {
        if (result == -1) {
            cb(-1)
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
            module.exports.getTypeByTypeId(QInfo.typeId, (type)=> {
                if (type == 0 || type == -1) {
                    cb(-1)
                }
                else {
                    let lsnId;
                    let updateInfo = {}
                    if (type.title == "quiz") {
                        lsnId = QInfo.lesson.value
                        updateInfo.quizCount = 1
                        updateInfo.quizScore = QInfo.score
                        module.exports.updateResultByLesson(lsnId, updateInfo, (updated)=> {
                            cb(result)
                        })
                    }
                    else {
                        module.exports.getExamById(QInfo.exam.value, (exam)=> {
                            if (exam == 0 || exam == -1) {
                                cb(result)
                            }
                            else {
                                lsnId = exam.preLesson.value
                                updateInfo.examCount = 1
                                updateInfo.examScore = QInfo.score
                                updateInfo.exId = QInfo.exam.value
                                updateInfo.time = exam.time
                                module.exports.updateResultByLesson(lsnId, updateInfo, (updated)=> {
                                    cb(result)
                                })
                            }
                        })

                    }

                }
            })
        }
    })
};

module.exports.updateResultByLesson = (lsnId, info, cb)=> {
    mongo.updateResultByLsnId(lsnId, info, (result)=> {
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

module.exports.addNotification = (NId, cb)=> {
    mongo.postNotification(NId, (result)=> {
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

module.exports.getNotificationById = (NId, cb)=> {
    mongo.getNotifById(NId, (notification)=> {
        if (notification == -1) {
            cb(-1)
        }
        else if (notification == 0) {
            cb(0)
        }
        else {
            cb(notification)
        }
    })
};

module.exports.getTicketById = (tktId, cb)=> {
    mongo.getTktById(tktId, (ticket)=> {
        if (ticket == -1) {
            cb(-1)
        }
        else if (ticket == 0) {
            cb(0)
        }
        else {
            cb(ticket)
        }
    })
};

module.exports.getTicketByStuId = (stuId, cb)=> {
    mongo.getTktByStuId(stuId, (ticket)=> {
        if (ticket == -1) {
            cb(-1)
        }
        else if (ticket == 0) {
            cb(0)
        }
        else {
            cb(ticket)
        }
    })
};

module.exports.getTicketByDepId = (depId, cb)=> {
    mongo.getTktBydepId(depId, (ticket)=> {
        if (ticket == -1) {
            cb(-1)
        }
        else if (ticket == 0) {
            cb(0)
        }
        else {
            cb(ticket)
        }
    })
};


module.exports.getTicketBySupId = (supId, cb)=> {
    mongo.getTktBySupId(supId, (ticket)=> {
        if (ticket == -1) {
            cb(-1)
        }
        else if (ticket == 0) {
            cb(0)
        }
        else {
            for (var i = 0; i < ticket.length; i++) {
                ticket[i].student = ticket[i].student[0]
                delete ticket[i].student[0]
            }
            cb(ticket)
        }
    })
};

module.exports.getAllTickets = (supId, cb)=> {
    module.exports.getSupportById(supId, (supporter)=> {
        if (supporter == -1) {
            cb(-1)
        }
        else if (supporter == 0) {
            cb(0)
        }
        else {
            logger.info("supporter", supporter)
            mongo.getTkts(supporter.department._id, (ticket)=> {
                if (ticket == -1) {
                    cb(-1)
                }
                else if (ticket == 0) {
                    cb(0)
                }
                else {
                    for (var i = 0; i < ticket.length; i++) {
                        ticket[i].student = ticket[i].student[0]
                        delete ticket[i].student[0]
                        ticket[i].supporter = supporter
                    }
                    cb(ticket)
                }
            })
        }
    })
};

module.exports.closeTicket = (now)=> {
    let pass = moment(now).subtract(3, 'days')
    mongo.closeTkt(pass, (resul)=> {
        console.log(resul)
    })

}

module.exports.getStuPlacement = (usrId, cb)=> {
    mongo.getViewByUsrId(usrId, (view)=> {
        if (view == -1) {
            cb(-1)
        }
        else if (view == 0) {
            cb(0)
        }
        else {
            let place = 0
            if (view[0].lsnId == 0) {
                place = 0
            }
            else {
                place = 1
            }
            cb(place)
        }
    })
};

module.exports.addExam = (exInfo, cb)=> {
    mongo.postExam(exInfo, (result)=> {
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

module.exports.updateExam = (exInfo, exId, cb)=> {
    module.exports.getExamById(exId, (exam)=> {
        if (exam == -1) {
            cb(-1)
        }
        else if (exam == 0) {
            cb(0)
        }
        else {
            let newExam = Object.assign({}, exam, exInfo)
            mongo.editExam(newExam, exId, (result)=> {
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
    })
};

module.exports.updateNotification = (notifInfo, NId, cb)=> {
    module.exports.getNotificationById(NId, (notification)=> {
        if (notification == -1) {
            cb(-1)
        }
        else if (notification == 0) {
            cb(0)
        }
        else {
            let newNotif = Object.assign({}, notification, notifInfo)
            mongo.editNotification(newNotif, NId, (result)=> {
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
    })
};

module.exports.updateTicket = (tktInfo, tktId, cb)=> {
    module.exports.getTicketById(tktId, (ticket)=> {
        if (ticket == -1) {
            cb(-1)
        }
        else if (ticket == 0) {
            cb(0)
        }
        else {
            module.exports.getTicketTypeById(ticket.depId, (department)=> {
                if (department == 0 || department == -1) {
                    ticket.department = {}

                }
                else {
                    ticket.department = {}
                    ticket.department.value = department._id
                    ticket.department.label = department.title
                }
            })
            logger.info("lastMSG", ticket.msg)
            logger.info("tktInfo", tktInfo.msg)


            let newMsg;
            if (tktInfo.newMsg) {
                tktInfo.msg._id = new ObjectID()
                tktInfo.msg.time = new Date().getTime()
                newMsg = ticket.msg
                newMsg.push(tktInfo.msg)
            }
            else {
                if (tktInfo.msg) {
                    let fk;
                    for (var i = 0; i < ticket.msg.length; i++) {
                        if (ticket.msg[i]._id == tktInfo.msg._id) {
                            fk = Object.assign(ticket.msg[i], tktInfo.msg)

                        }
                    }
                    logger.info("fk", fk)
                    newMsg = ticket.msg

                }
                else {
                    newMsg = ticket.msg
                }

            }

            logger.info("newMSG in updateTicket", newMsg)
            let newTicket = Object.assign({}, ticket, tktInfo)
            newTicket.msg = newMsg
            mongo.editTicket(newTicket, tktId, (result)=> {
                if (result == -1) {
                    cb(-1)
                }
                else if (result == 0) {
                    cb(0)
                }
                else {
                    if (tktInfo.newMsg) {
                        result.department = ticket.department
                        tktInfo.msg.ticket = result
                        cb(tktInfo.msg)
                    }
                    else {
                        result.department = ticket.department
                        cb(result)
                    }
                }
            })

        }
    })
};

module.exports.updateTicketView = (tktId, cb)=> {
    module.exports.getTicketById(tktId, (ticket)=> {
        if (ticket == -1) {
            cb(-1)
        }
        else if (ticket == 0) {
            cb(0)
        }
        else {
            for (var i = 0; i < ticket.msg.length; i++) {
                ticket.msg[i].viewed = true
            }
            mongo.editTicket(ticket, tktId, (result)=> {
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
    })
};

module.exports.updateTypeOfTicket = (depInfo, tktId, cb)=> {
    mongo.editTypeOfTicket(depInfo, tktId, (result)=> {
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

module.exports.deleteTypeOfTicket = (depId, cb)=> {
    module.exports.getTicketByDepId(depId, (ticket)=> {
        logger.info(ticket)
        if (ticket == -1) {
            cb(-1)
        }
        else if (ticket == 0) {
            mongo.delTypeOfTicket(depId, (result)=> {
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

module.exports.updateText = (updateInfo, txtId, cb)=> {
    module.exports.getTextById(txtId, (text)=> {
        if (text == -1) {
            cb(-1)
        }
        else if (text == 0) {
            cb(0)
        }
        else {
            let newText = Object.assign({}, text, updateInfo)
            mongo.editText(newText, txtId, (result)=> {
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
    })
};

module.exports.addType = (typeInfo, cb)=> {
    if (typeof typeInfo.category == "string") {
        typeInfo.category = JSON.parse(typeInfo.category)
    }
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

module.exports.addTypeOfTicket = (typeInfo, cb)=> {
    mongo.postTypeOfTicket(typeInfo, (result)=> {
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

module.exports.addCategory = (categoryInfo, cb)=> {
    mongo.postCategory(categoryInfo, (result)=> {
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

module.exports.addText = (textInfo, cb)=> {
    mongo.postText(textInfo, (result)=> {
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

module.exports.addNote = (noteInfo, cb)=> {
    mongo.postNote(noteInfo, (result)=> {
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

module.exports.addCertificate = (certInfo, cb)=> {
    mongo.postCertification(certInfo, (result)=> {
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

module.exports.updateNote = (updateNote, ntId, cb)=> {
    mongo.editNote(updateNote, ntId, (result)=> {
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

module.exports.getQuestionById = (QId, cb)=> {
    mongo.getQstById(QId, (question)=> {
        if (question == -1) {
            cb(-1)
        }
        else if (question == 0) {
            cb(0)
        }
        else {
            cb(question)
        }
    })
}

module.exports.getExamById = (exId, cb)=> {
    mongo.getExById(exId, (exam)=> {
        if (exam == -1) {
            cb(-1)
        }
        else if (exam == 0) {
            cb(0)
        }
        else {
            cb(exam)
        }
    })
}

module.exports.getTextById = (txtId, cb)=> {
    mongo.getTxtById(txtId, (exam)=> {
        if (exam == -1) {
            cb(-1)
        }
        else if (exam == 0) {
            cb(0)
        }
        else {
            cb(exam)
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
            if (updateInfo.score != question.score) {
                let updateScoreTotal = updateInfo.score
                updateInfo.score = updateInfo.score - question.score
                module.exports.getTypeByTypeId(updateInfo.typeId, (type)=> {
                    if (type == 0 || type == -1) {
                        cb(-1)
                    }
                    else {
                        let lsnId;
                        if (type.title == "quiz") {
                            lsnId = updateInfo.lesson.value
                            updateInfo.quizCount = 0
                            updateInfo.quizScore = updateInfo.score
                            module.exports.updateResultByLesson(lsnId, updateInfo, (updated)=> {
                                var newQuestion = Object.assign({}, question, updateInfo)
                                newQuestion.score = updateScoreTotal
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
                            })
                        }
                        else {
                            module.exports.getExamById(updateInfo.exam.value, (exam)=> {
                                if (exam == 0 || exam == -1) {
                                    cb(result)
                                }
                                else {
                                    lsnId = exam.preLesson.value
                                    updateInfo.examCount = 0
                                    updateInfo.examScore = updateInfo.score
                                    updateInfo.exId = updateInfo.exam.value
                                    updateInfo.time = exam.time
                                    module.exports.updateResultByLesson(lsnId, updateInfo, (updated)=> {
                                        var newQuestion = Object.assign({}, question, updateInfo)
                                        newQuestion.score = updateScoreTotal

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
                                    })
                                }
                            })

                        }

                    }
                })

            }
            else {
                var newQuestion = Object.assign({}, question, updateInfo)
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
                        module.exports.getTypeByTypeId(newQuestion.typeId, (type)=> {
                            if (type == 0 || type == -1) {
                                cb(-1)
                            }
                            else {
                                let lsnId;
                                let updateInfo = {}
                                if (type.title == "quiz") {
                                    lsnId = newQuestion.lesson.value
                                    updateInfo.quizCount = 1
                                    updateInfo.quizScore = newQuestion.score
                                }
                                else {
                                    module.exports.getExamById(newQuestion.exam.value, (exam)=> {
                                        if (exam == 0 || exam == -1) {
                                            cb(result)
                                        }
                                        else {
                                            lsnId = exam.preLesson.value
                                            updateInfo.examCount = 1
                                            updateInfo.examScore = newQuestion.score
                                            updateInfo.exId = newQuestion.exam.value
                                            updateInfo.time = exam.time
                                        }
                                    })

                                }
                                module.exports.updateResultByLesson(lsnId, updateInfo, (updated)=> {
                                    cb(result)
                                })
                            }
                        })
                    }
                })
            }

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

module.exports.delText = (txtId, cb)=> {
    mongo.deleteText(txtId, (result)=> {
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

module.exports.delQuestion = (QId, cb)=> {
    module.exports.getQuestionById(QId, (question)=> {
        if (question == -1) {
            cb(-1)
        }
        else if (question == 0) {
            cb(0)
        }
        else {
            let updateInfo = {}
            updateInfo.score = -updateInfo.score
            module.exports.getTypeByTypeId(updateInfo.typeId, (type)=> {
                if (type == 0 || type == -1) {
                    cb(-1)
                }
                else {
                    let lsnId;
                    if (type.title == "quiz") {
                        lsnId = updateInfo.lesson.value
                        updateInfo.quizCount = -1
                        updateInfo.quizScore = updateInfo.score
                        module.exports.updateResultByLesson(lsnId, updateInfo, (updated)=> {
                            // mongo.deleteQuestion(QId, (result)=> {
                            //     if (result == -1) {
                            //         cb(-1)
                            //     }
                            //     else if (result == 0) {
                            //         cb(0)
                            //     }
                            //     else {
                            //         cb(result)
                            //     }
                            // })
                        })
                    }
                    else {
                        module.exports.getExamById(updateInfo.exam.value, (exam)=> {
                            if (exam == 0 || exam == -1) {
                                cb(result)
                            }
                            else {
                                lsnId = exam.preLesson.value
                                updateInfo.examCount = -1
                                updateInfo.examScore = updateInfo.score
                                updateInfo.exId = updateInfo.exam.value
                                updateInfo.time = exam.time
                                module.exports.updateResultByLesson(lsnId, updateInfo, (updated)=> {

                                    // mongo.deleteQuestion(QId, (result)=> {
                                    //     if (result == -1) {
                                    //         cb(-1)
                                    //     }
                                    //     else if (result == 0) {
                                    //         cb(0)
                                    //     }
                                    //     else {
                                    //         cb(result)
                                    //     }
                                    // })
                                })
                            }
                        })

                    }

                }
            })


        }
    })


};

module.exports.delExam = (exId, cb)=> {
    mongo.deleteExam(exId, (result)=> {
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

module.exports.delNotification = (NId, cb)=> {
    mongo.deleteNotification(NId, (result)=> {
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

module.exports.getLevelOfStu = (usrId, cb)=> {
    console.log("usrId", usrId)
    module.exports.getViewOfUsr(usrId, (view)=> {
        if (view == 0 || view == -1) {
            cb(-1)
        }
        else {
            module.exports.getLessonById(view[0].lsnId, (lesson)=> {
                if (lesson == 0 || lesson == -1) {
                    cb(-1)
                }
                else {


                    cb(lesson[0].level)


                }
            })
        }
    })
};


module.exports.getLessonById = (lsnId, cb)=> {
    if (lsnId == 0) {
        module.exports.getFirstLesson((firstLesson)=> {
            if (firstLesson == 0 || firstLesson == -1) {
                cb(-1)
            }
            else {
                lsnId = firstLesson._id
                mongo.getLsnById(lsnId, (result)=> {
                    if (result == -1) {
                        cb(-1)
                    }
                    else if (result == 0) {
                        cb(0)
                    }
                    else {
                        result[0].level = result[0].level[0]
                        module.exports.getAllTpe((type)=> {
                            if (type == 0 || type == -1) {
                                cb(-1)
                            }
                            else {
                                var k = 0
                                for (var i = 0; i < result[0].video.length; i++) {
                                    for (k = 0; k < type.length; k++) {
                                        if (result[0].video[i].typeId.equals(type[k]._id)) {
                                            result[0].video[i].type = type[k]
                                        }
                                    }

                                }
                                k = 0
                                for (var i = 0; i < result[0].sound.length; i++) {
                                    for (k = 0; k < type.length; k++) {
                                        if (result[0].sound[i].typeId.equals(type[k]._id)) {
                                            result[0].sound[i].type = type[k]
                                        }

                                    }

                                }
                                k = 0
                                for (var i = 0; i < result[0].text.length; i++) {
                                    for (k = 0; k < type.length; k++) {
                                        if (result[0].text[i].typeId.equals(type[k]._id)) {
                                            result[0].text[i].type = type[k]
                                        }

                                    }

                                }
                                cb(result)

                            }
                        })
                    }
                })

            }
        })
    }
    else {
        mongo.getLsnById(lsnId, (result)=> {
            if (result == -1) {
                cb(-1)
            }
            else if (result == 0) {
                cb(0)
            }
            else {
                result[0].level = result[0].level[0]
                module.exports.getAllTpe((type)=> {
                    if (type == 0 || type == -1) {
                        cb(-1)
                    }
                    else {
                        var k = 0
                        for (var i = 0; i < result[0].video.length; i++) {
                            for (k = 0; k < type.length; k++) {
                                if (result[0].video[i].typeId.equals(type[k]._id)) {
                                    result[0].video[i].type = type[k]
                                }
                            }

                        }
                        k = 0
                        for (var i = 0; i < result[0].sound.length; i++) {
                            for (k = 0; k < type.length; k++) {
                                if (result[0].sound[i].typeId.equals(type[k]._id)) {
                                    result[0].sound[i].type = type[k]
                                }

                            }

                        }
                        k = 0
                        for (var i = 0; i < result[0].text.length; i++) {
                            for (k = 0; k < type.length; k++) {
                                if (result[0].text[i].typeId.equals(type[k]._id)) {
                                    result[0].text[i].type = type[k]
                                }

                            }

                        }
                        cb(result)

                    }
                })
            }
        })
    }
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

module.exports.getNotifications = (cb)=> {
    mongo.getAllNotifications((result)=> {
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

module.exports.addSupporter = (data, cb)=> {
    if (typeof data.department == "string") {
        data.department = JSON.parse(data.department)
    }

    mongo.postSupporter(data, (added)=> {
        if (added == -1) {
            cb(-1)
        }
        else {
            cb(added)
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

module.exports.getSupporters = (cb)=> {
    mongo.getAllSupporters((sups)=> {
        if (sups == -1) {
            cb(-1)
        }
        else if (sups == 0) {
            cb(0)
        }
        else {
            cb(sups)
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

module.exports.updateSupporter = (updateInfo, supId, cb)=> {
    if (typeof updateInfo.department == "string") {
        updateInfo.department = JSON.parse(updateInfo.department)
    }
    module.exports.getSupportById(supId, (support)=> {
        if (support == -1) {
            cb(-1)
        }
        else if (support == 0) {
            cb(0)
        }
        else {
            let newSupporter = Object.assign({}, support, updateInfo)
            mongo.editSupporter(newSupporter, supId, (result)=> {
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
    })
};

module.exports.updateChatAdmin = (updateInfo, caId, cb)=> {
    module.exports.getChatAdminById(caId, (support)=> {
        if (support == -1) {
            cb(-1)
        }
        else if (support == 0) {
            cb(0)
        }
        else {
            if (typeof support.chatrooms == "string") {
                support.chatrooms = JSON.parse(support.chatrooms)
            }
            if (typeof updateInfo.chatrooms == "string") {
                updateInfo.chatrooms = JSON.parse(updateInfo.chatrooms)
            }
            logger.info("updateInfo", updateInfo)

            // let newChatrooms = Object.assign([], support.chatrooms, updateInfo.chatrooms)
            let newChatAdmin = Object.assign({}, support, updateInfo)
            newChatAdmin.chatrooms = updateInfo.chatrooms

            logger.info("newChatAdmin", newChatAdmin)
            logger.info("caId", caId)
            module.exports.updateMessage(newChatAdmin, 0, (updatedMsg)=> {
                // logger.info("updatedeMsg", updatedMsg)
                mongo.editChatAdmin(newChatAdmin, caId, (result)=> {
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
            })
        }
    })

};

module.exports.getChatAdminById = (caId, cb)=> {
    mongo.getChatAdmnById(caId, (result)=> {
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

module.exports.getChatAdmins = (cb)=> {
    mongo.getAllChatAdmins((sups)=> {
        if (sups == -1) {
            cb(-1)
        }
        else if (sups == 0) {
            cb(0)
        }
        else {
            cb(sups)
        }
    })
};

module.exports.delChatAdmin = (caId, cb)=> {
    mongo.deleteChatAdmin(caId, (result)=> {
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

module.exports.addChatAdmin = (data, cb)=> {
    mongo.postChatAdmin(data, (added)=> {
        if (added == -1) {
            cb(-1)
        }
        else {
            cb(added)
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

module.exports.delSupporter = (supId, cb)=> {
    mongo.deleteSupporter(supId, (result)=> {
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

module.exports.addTrick = (trickInfo, cb)=> {
    mongo.postTrick(trickInfo, (result)=> {
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

module.exports.updateTrick = (updateInfo, trckId, cb)=> {
    module.exports.getTrickById(trckId, (trick)=> {
        if (trick == -1) {
            cb(-1)
        }
        else if (trick == 0) {
            cb(0)
        }
        else {
            let newTrick = Object.assign({}, trick[0], updateInfo)
            mongo.editTrick(newTrick, trckId, (result)=> {
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

module.exports.getViewOfUsr = (usrId, cb)=> {
    mongo.getViewByUsrId(usrId, (view)=> {
        if (view == -1) {
            cb(-1)
        }
        else if (view == 0) {
            cb(0)
        }
        else {
            cb(view)
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

module.exports.getTrickById = (id, cb)=> {
    mongo.getTrickBYTrickId(id, (trick)=> {
        if (trick == -1) {
            cb(-1)
        }
        else if (trick == 0) {
            cb(0)
        }
        else {
            cb(trick)
        }
    })
}

module.exports.getResultByLsnUsr = (usrId, lsnId, cb)=> {
    mongo.getResultByLsnIdUsrId(usrId, lsnId, (result)=> {
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

module.exports.getResultByUsr = (usrId, cb)=> {
    mongo.getResultByUsrId(usrId, (result)=> {
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
        else if (addedAdmin == -2) {
            cb(-2)
        }
        else {
            let data = {}
            data.usrId = addedAdmin
            data.createdTime = new Date().getTime()
            data.mobile = stuData.mobile
            data.verifyCode = Math.floor(1000 + Math.random() * 9000)
            module.exports.addVerifyStu(data, (verified)=> {
                smsPanel.sendVerificationSMS(data, (sent)=> {
                    cb(addedAdmin)
                })
            })
        }
    })
};

module.exports.addVerifyStu = (data, cb)=> {
    mongo.postVerifyStu(data, (addedVerify)=> {
        if (addedVerify == -1) {
            cb(-1)
        }
        else {
            cb(addedVerify)
        }
    })
}

module.exports.updateVerifyStu = (data, cb)=> {
    data._id = data.usrId
    module.exports.verifyStu(data, (verify)=> {
        if (verify == -1) {
            cb(-1)
        }
        else if (verify == 0) {
            cb(0)
        }
        else {
            let newVerify = Object.assign({}, verify, data)
            mongo.editVerifyStu(newVerify, data._id, (addedVerify)=> {
                if (addedVerify == -1) {
                    cb(-1)
                }
                else {
                    cb(addedVerify)
                }
            })

        }
    })
}


module.exports.addView = (viewInfo, cb)=> {
    mongo.postView(viewInfo, (addedView)=> {
        if (addedView == -1) {
            cb(-1)
        }
        else {
            cb(addedView)
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

module.exports.getCertificationById = (certId, cb)=> {
    mongo.getCertById(certId, (result)=> {
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

module.exports.getAllCertification = (cb)=> {
    mongo.getAllCerts((result)=> {
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

module.exports.getCertificationByUsrId = (usrId, cb)=> {
    mongo.getCertByUsrId(usrId, (result)=> {
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

module.exports.getAllTrick = (cb)=> {
    mongo.getAllTrickes((result)=> {
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

module.exports.getQuestions = (cb)=> {
    mongo.getAllQuestions((result)=> {
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

module.exports.getExams = (usrId, cb)=> {
    mongo.getAllExams(usrId, (result)=> {
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

module.exports.getExamPassedCount = (usrId, cb)=> {
    module.exports.getResultByUsr(usrId, (result)=> {
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

module.exports.getNotes = (lsnId, usrId, cb)=> {
    mongo.getAllNotes(lsnId, usrId, (result)=> {
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

module.exports.deleteChatRoomMessage = ()=> {
    module.exports.getAllChatrooms((chatRooms)=> {
        logger.info("chat", chatRooms)
        if (chatRooms != 0 || chatRooms != -1) {
            for (var i = 0; i < chatRooms.length; i++) {
                if (moment().format('HH') >= chatRooms[i].endTime) {
                    mongo.deletechatRoomMessages(chatRooms[i]._id, ()=> {
                    })
                }
            }
        }
    })
}

module.exports.unblockUsers = ()=> {
    module.exports.getAllStu((students)=> {
        if (students != 0 || students != -1) {
            for (var k = 0; k < students.length; k++) {
                if (students[k].chatrooms) {
                    for (var i = 0; i < students[k].chatrooms.length; i++) {
                        if (students[k].chatrooms[i] && students[k].chatrooms[i].blocked != 0 && students[k].chatrooms[i] != -1)
                            if (moment(students[k].chatrooms[i].blockedTime).add(students[k].chatrooms[i].blocked, 'h') <= new Date().getTime()) {
                                let data = {}
                                data.blocked = 0
                                data.blockedTime = ""
                                data.chId = students[k].chatrooms[i]._id
                                mongo.blockUser(data, students[k]._id, ()=> {
                                })
                            }
                    }
                }

            }
        }
    })
}

module.exports.updateStudent = (updateInfo, stdId, cb)=> {
    //for editting studentChatroom
    if (stdId == 0) {
        // mongo.getStudentChatroom(updateInfo._id ,  )
        mongo.editStudentChatroom(updateInfo, updateInfo._id, (result)=> {
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
    }
    else {
        if (updateInfo.warned) {
            let count = 0
            mongo.warnUser(updateInfo, stdId, (result)=> {
                if (result == -1) {
                    cb(-1)
                }
                else if (result == 0) {
                    cb(0)
                }
                else {
                    for (var i = 0; i < result.chatrooms.length; i++) {
                        if (result.chatrooms[i] && result.chatrooms[i]._id == updateInfo.chId) {
                            count = result.chatrooms[i].warned
                        }
                    }
                    logger.info("warnUser db", count)

                    cb(count)
                }
            })
        }
        else if (updateInfo.blocked != undefined) {
            mongo.blockUser(updateInfo, stdId, (result)=> {
                let blocked = 0
                if (result == -1) {
                    cb(-1)
                }
                else if (result == 0) {
                    cb(0)
                }
                else {
                    for (var i = 0; i < result.chatrooms.length; i++) {
                        if (result.chatrooms[i] && result.chatrooms[i]._id == updateInfo.chId) {
                            blocked = result.chatrooms[i].blocked
                        }
                    }
                    logger.info("warnUser db", blocked)
                    cb(blocked)
                }
            })

        }
        else {
            module.exports.getStuById(stdId, (student)=> {
                if (student == -1
                ) {
                    cb(-1)
                }
                else if (student == 0) {
                    cb(0)
                }
                else {

                    let newStu = Object.assign({}, student, updateInfo)
                    module.exports.updateMessage(newStu, 0, (updatedMsg)=> {
                        mongo.editStudent(newStu, stdId, (result)=> {
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

                    })
                }
            })

        }
    }

};

module.exports.updateCertificate = (updateInfo, certId, cb)=> {
    module.exports.getCertificationById(certId, (certification)=> {
        if (certification == -1
        ) {
            cb(-1)
        }
        else if (certification == 0) {
            cb(0)
        }
        else {
            let newCertif = Object.assign({}, certification, updateInfo)
            mongo.editCertification(newCertif, certId, (result)=> {
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


        }
    })
};

module.exports.updateViewToInsert = (updateInfo, lsnId, cb)=> {
    mongo.editViewToInsert(updateInfo, lsnId, (result)=> {
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

module.exports.updateViewToSetTrue = (id, usrId, type, cb)=> {
    console.log(id, usrId, type)
    mongo.editViewTosetTrue(id, usrId, type, (result)=> {
        logger.info("updateViewToSetTrue data", result)

        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            let permissionTrue = true
            for (var i = 0; i < result.video.length; i++) {
                if (result.video[i].viewed == false) {
                    permissionTrue = false
                }
            }
            if (permissionTrue == true) {
                for (var i = 0; i < result.sound.length; i++) {
                    if (result.sound[i].viewed == false) {
                        permissionTrue = false
                    }
                }
            }
            if (permissionTrue == true) {
                result.viewPermission = true
                module.exports.updateViewByUsrId(result, usrId, (res)=> {
                    if (res == -1) {
                        cb(-1)
                    }
                    else if (res == 0) {
                        cb(0)
                    }
                    else {
                        cb(result)
                    }
                })
            }
            else {
                cb(result)

            }
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

module.exports.getSupportById = (supId, cb)=> {
    mongo.getSupById(supId, (result)=> {
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

module.exports.getStuByLesson = (usrId, cb)=> {
    module.exports.getViewOfUsr(usrId, (view)=> {
        mongo.getStudentByLesson(view[0].lsnId, (result)=> {
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

    })
};

module.exports.getStuByLessonLsnId = (lsnId, cb)=> {
    mongo.getStudentByLesson(lsnId, (result)=> {
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

module.exports.getAllText = (cb)=> {
    mongo.getAllTexts((result)=> {
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

module.exports.getAllTktTypes = (cb)=> {
    mongo.getAllTicketTypes((result)=> {
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

module.exports.getAllCats = (cb)=> {
    mongo.getAllCategories((result)=> {
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

module.exports.getQuizLsnId = (lsnId, cb)=> {
    mongo.getQuizByLesson(lsnId, (question)=> {
        if (question == -1) {
            cb(-1)
        }
        else if (question == 0) {
            cb(0)
        }
        else {
            cb(question)
        }
    })
}

module.exports.getExamQuest = (examId, cb)=> {
    mongo.getExamQuestion(examId, (question)=> {
        if (question == -1) {
            cb(-1)
        }
        else if (question == 0) {
            cb(0)
        }
        else {
            cb(question)
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

module.exports.delNote = (ntId, cb)=> {
    mongo.deleteNote(ntId, (type)=> {
        if (type == -1) {
            cb(-1)
        }
        else {
            cb(type)
        }
    })
}

module.exports.delTrick = (trckId, cb)=> {

    mongo.deleteTrick(trckId, (trick)=> {
        if (trick == -1) {
            cb(-1)
        }
        else {
            cb(trick)
        }
    })

}

module.exports.getFirstLesson = (cb) => {
    module.exports.getFirstLevel(level=> {
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
        module.exports.getFirstLesson((result)=> {
            if (result == -1) {
                cb(-1)
            }
            else if (result == 0) {
                cb(0)
            }
            else {
                module.exports.getLessonById(result._id, (lesson)=> {
                    if (lesson == -1) {
                        cb(-1)
                    }
                    else if (lesson == 0) {
                        cb(0)
                    }
                    else {
                        lesson = lesson[0]
                        module.exports.getStuByUsername(placeInfo.username, (student)=> {
                            if (student == -1) {
                                cb(-1)
                            }
                            else if (student == 0) {
                                cb(0)
                            }
                            else {
                                let stu = {}
                                stu.chatrooms = []
                                module.exports.getChatRoomByLessonId(lesson._id, (lessonChat)=> {
                                    if (lessonChat == 0 || lessonChat == -1) {
                                        stu.chatrooms.push({})
                                    }
                                    else {
                                        lessonChat.position = "currentLesson"
                                        lessonChat.blocked = 0
                                        lessonChat.warned = 0
                                        lessonChat.blockedTime = ""

                                        stu.chatrooms.push(lessonChat)

                                    }
                                    module.exports.getChatRoomByLevelId(lesson.lvlId, (lessonChat)=> {
                                        if (lessonChat == 0 || lessonChat == -1) {
                                            stu.chatrooms.push({})
                                        }
                                        else {
                                            lessonChat.position = "currentLevel"
                                            lessonChat.blocked = 0
                                            lessonChat.warned = 0
                                            lessonChat.blockedTime = ""

                                            stu.chatrooms.push(lessonChat)

                                        }
                                        stu.lastPassedLesson = lesson._id
                                        let newStudent = Object.assign({}, student[0], stu)
                                        module.exports.updateStudent(newStudent, student[0]._id, (result)=> {
                                            if (result == -1) {
                                                cb(-1)
                                            }
                                            else if (result == 0) {
                                                cb(0)
                                            }
                                            else {
                                                let newView = {}
                                                newView.lsnId = lesson._id
                                                newView.video = []
                                                newView.sound = []
                                                for (var i = 0; i < lesson.video.length; i++) {
                                                    newView.video[i] = {}
                                                    newView.video[i]._id = lesson.video[i]._id
                                                    newView.video[i].viewed = false
                                                }
                                                for (var i = 0; i < lesson.sound.length; i++) {
                                                    newView.sound[i] = {}
                                                    newView.sound[i]._id = lesson.sound[i]._id
                                                    newView.sound[i].viewed = false
                                                }
                                                module.exports.updateViewByUsrId(newView, student[0]._id, (updated)=> {
                                                    let resultInfo = {}
                                                    resultInfo.usrId = student[0]._id
                                                    resultInfo.lsnId = lesson._id
                                                    resultInfo.quiz = {}
                                                    resultInfo.quiz.time = lesson.deadline
                                                    resultInfo.quiz.questionTrue = 0;
                                                    resultInfo.quiz.getScore = 0
                                                    resultInfo.quiz.permission = true
                                                    resultInfo.exam = {}
                                                    resultInfo.timePassed = ""
                                                    resultInfo.passedLesson = false
                                                    module.exports.updateResult(student[0]._id, 0, resultInfo, (addedResult)=> {
                                                        cb(lesson)
                                                    })
                                                })
                                            }
                                        })
                                    })

                                })

                            }
                        })

                    }
                })
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
                lesson = lesson[0]
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
                                                        stu.chatrooms = []
                                                        module.exports.getChatRoomByLessonId(lesson1._id, (lessonChat)=> {
                                                            if (lessonChat == 0 || lessonChat == -1) {
                                                                stu.chatrooms.push({})
                                                            }
                                                            else {
                                                                lessonChat.position = "lastLesson"
                                                                stu.chatrooms.push(lessonChat)

                                                            }
                                                            module.exports.getChatRoomByLessonId(lesson._id, (lessonChat)=> {
                                                                if (lessonChat == 0 || lessonChat == -1) {
                                                                    stu.chatrooms.push({})
                                                                }
                                                                else {
                                                                    lessonChat.position = "currentLesson"
                                                                    stu.chatrooms.push(lessonChat)

                                                                }
                                                                module.exports.getChatRoomByLevelId(lesson.lvlId, (lessonChat)=> {
                                                                    if (lessonChat == 0 || lessonChat == -1) {
                                                                        stu.chatrooms.push({})
                                                                    }
                                                                    else {
                                                                        lessonChat.position = "currentLevel"
                                                                        stu.chatrooms.push(lessonChat)

                                                                    }
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
                                                                            let newView = {}
                                                                            newView.lsnId = lesson._id
                                                                            newView.video = []
                                                                            newView.sound = []
                                                                            for (var i = 0; i < lesson.video.length; i++) {
                                                                                newView.video[i] = {}
                                                                                newView.video[i]._id = lesson.video[i]._id
                                                                                newView.video[i].viewed = false
                                                                            }
                                                                            for (var i = 0; i < lesson.sound.length; i++) {
                                                                                newView.sound[i] = {}

                                                                                newView.sound[i]._id = lesson.sound[i]._id
                                                                                newView.sound[i].viewed = false
                                                                            }
                                                                            module.exports.updateViewByUsrId(newView, student[0]._id, (updated)=> {
                                                                                let resultInfo = {}
                                                                                resultInfo.usrId = student[0]._id
                                                                                resultInfo.lsnId = lesson._id
                                                                                resultInfo.quiz = {}
                                                                                resultInfo.quiz.time = lesson.deadline
                                                                                resultInfo.quiz.questionTrue = 0;
                                                                                resultInfo.quiz.getScore = 0
                                                                                resultInfo.quiz.permission = true
                                                                                resultInfo.exam = {}
                                                                                resultInfo.timePassed = ""
                                                                                resultInfo.passedLesson = false

                                                                                module.exports.updateResult(student[0]._id, lesson._id, resultInfo, (addedResult)=> {
                                                                                    cb(lesson)
                                                                                })
                                                                            })
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        })


                                                    }

                                                })
                                            }
                                        })
                                    }
                                })
                            }
                            else {
                                let info = {lsnId: 0, username: placeInfo.username}
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
                                            stu.chatrooms = []
                                            module.exports.getChatRoomByLessonId(lastPassedLesson[0]._id, (lessonChat)=> {
                                                if (lessonChat == 0 || lessonChat == -1) {
                                                    stu.chatrooms.push({})
                                                }
                                                else {
                                                    lessonChat.position = "lastLesson"
                                                    lessonChat.blocked = 0
                                                    lessonChat.warned = 0
                                                    lessonChat.blockedTime = ""
                                                    stu.chatrooms.push(lessonChat)
                                                }
                                                module.exports.getChatRoomByLessonId(placeInfo.lsnId, (lessonChat)=> {
                                                    if (lessonChat == 0 || lessonChat == -1) {
                                                        stu.chatrooms.push({})
                                                    }
                                                    else {
                                                        lessonChat.position = "currentLesson"
                                                        lessonChat.blocked = 0
                                                        lessonChat.warned = 0
                                                        lessonChat.blockedTime = ""

                                                        stu.chatrooms.push(lessonChat)

                                                    }
                                                    module.exports.getChatRoomByLevelId(lastPassedLesson[0].lvlId, (lessonChat)=> {
                                                        if (lessonChat == 0 || lessonChat == -1) {
                                                            stu.chatrooms.push({})
                                                        }
                                                        else {
                                                            lessonChat.position = "currentLevel"
                                                            lessonChat.blocked = 0
                                                            lessonChat.warned = 0
                                                            lessonChat.blockedTime = ""

                                                            stu.chatrooms.push(lessonChat)
                                                        }
                                                        stu.lastPassedLesson = lastPassedLesson[0]._id
                                                        let newStudent = Object.assign({}, student[0], stu)
                                                        module.exports.updateStudent(newStudent, student[0]._id, (result)=> {
                                                            if (result == -1) {
                                                                cb(-1)
                                                            }
                                                            else if (result == 0) {
                                                                cb(0)
                                                            }
                                                            else {
                                                                if (lesson[0] != undefined)
                                                                    lesson = lesson[0]
                                                                lesson.level = level
                                                                let newView = {}
                                                                newView.lsnId = lesson._id
                                                                newView.video = []
                                                                newView.sound = []
                                                                for (var i = 0; i < lesson.video.length; i++) {
                                                                    newView.video[i] = {}

                                                                    newView.video[i]._id = lesson.video[i]._id
                                                                    newView.video[i].viewed = false
                                                                }
                                                                for (var i = 0; i < lesson.sound.length; i++) {
                                                                    newView.sound[i] = {}

                                                                    newView.sound[i]._id = lesson.sound[i]._id
                                                                    newView.sound[i].viewed = false
                                                                }
                                                                module.exports.updateViewByUsrId(newView, student[0]._id, (updated)=> {
                                                                    let resultInfo = {}
                                                                    resultInfo.usrId = student[0]._id
                                                                    resultInfo.lsnId = lesson._id
                                                                    // resultInfo.lsnId = 0
                                                                    resultInfo.quiz = {}
                                                                    resultInfo.quiz.time = lesson.deadline
                                                                    resultInfo.quiz.questionTrue = 0;
                                                                    resultInfo.quiz.getScore = 0
                                                                    resultInfo.quiz.permission = true
                                                                    resultInfo.exam = {}
                                                                    resultInfo.timePassed = ""
                                                                    resultInfo.passedLesson = false
                                                                    module.exports.updateResult(student[0]._id, lesson._id, resultInfo, (addedResult)=> {
                                                                        cb(lesson)
                                                                    })
                                                                })
                                                            }
                                                        })
                                                    })
                                                })
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

module.exports.updateViewByUsrId = (updateInfo, usrId, cb)=> {
    module.exports.getViewOfUsr(usrId, (lastView)=> {
        if (lastView == 0) {
            cb(0)
        }
        else {
            let newView = Object.assign(lastView, updateInfo)
            logger.info("newView in updateViewByUsrId", newView)
            mongo.editViewByUsrId(newView, usrId, (updated)=> {
                if (updated == -1) {
                    cb(-1)
                }
                else if (updated == 0) {
                    cb(0)
                }
                else {
                    cb(updated)
                }

            })
        }
    })
}

module.exports.addResult = (resultInfo, cb)=> {
    logger.info("result Info in add result in testing placement", resultInfo)
    resultInfo.round = false
    resultInfo.examRound = false
    resultInfo.examTimePassed = ""
    if (resultInfo.lsnId != 0) {
        module.exports.getExamByLessonId(resultInfo.lsnId, (exam)=> {
            if (exam == -1) {
                cb(-1)
            }
            else if (exam == 0) {
                module.exports.getQuestionsScoreCountByLesson(resultInfo.lsnId, (data)=> {
                    if (data == -1) {
                        cb(-1)
                    }
                    else if (data == 0) {
                        resultInfo.exam = {}
                        resultInfo.exam.time = 0
                        resultInfo.exam.questionTrue = 0;
                        resultInfo.exam.getScore = 0
                        resultInfo.exam._id = 0
                        resultInfo.exam.permission = false
                        resultInfo.exam.examScore = 0
                        resultInfo.exam.examCount = 0
                        resultInfo.quiz.quizScore = 0
                        resultInfo.quiz.quizCount = 0
                        resultInfo.quiz.getScore = 0

                        mongo.postResult(resultInfo, (added)=> {
                            if (added == -1) {
                                cb(-1)
                            }
                            else {
                                cb(added)
                            }
                        })
                    }
                    else {
                        if (data.length > 1) {
                            resultInfo.exam.examScore = data[0].totalScore
                            resultInfo.exam.examCount = data[0].count
                            resultInfo.quiz.quizScore = data[1].totalScore
                            resultInfo.quiz.quizCount = data[1].count
                        }
                        else {
                            resultInfo.exam.examScore = 0
                            resultInfo.exam.examCount = 0
                            resultInfo.quiz.quizScore = data[0].totalScore
                            resultInfo.quiz.quizCount = data[0].count
                        }
                        module.exports.getQuestionsScoreCountByLesson(resultInfo.lsnId, (data)=> {

                            if (data == -1) {
                                cb(-1)
                            }
                            else if (data == 0) {
                                resultInfo.exam.examScore = 0
                                resultInfo.exam.examCount = 0
                                resultInfo.quiz.quizScore = 0
                                resultInfo.quiz.quizCount = 0
                                mongo.postResult(resultInfo, (added)=> {
                                    if (added == -1) {
                                        cb(-1)
                                    }
                                    else {
                                        cb(added)
                                    }
                                })
                            }
                            else {
                                if (data.length > 1) {
                                    resultInfo.exam.examScore = data[0].totalScore
                                    resultInfo.exam.examCount = data[0].count
                                    resultInfo.quiz.quizScore = data[1].totalScore
                                    resultInfo.quiz.quizCount = data[1].count
                                }
                                else {
                                    resultInfo.exam.examScore = 0
                                    resultInfo.exam.examCount = 0
                                    resultInfo.quiz.quizScore = data[0].totalScore
                                    resultInfo.quiz.quizCount = data[0].count
                                }


                                mongo.postResult(resultInfo, (added)=> {
                                    if (added == -1) {
                                        cb(-1)
                                    }
                                    else {
                                        cb(added)
                                    }
                                })
                            }
                        })

                    }
                })
            }
            else {
                resultInfo.exam = {}
                resultInfo.exam.time = exam.time
                resultInfo.exam.questionTrue = 0;
                resultInfo.exam.getScore = 0
                resultInfo.exam._id = exam._id
                resultInfo.exam.permission = false
                module.exports.getQuestionsScoreCountByLesson(resultInfo.lsnId, (data)=> {

                    if (data == -1) {
                        cb(-1)
                    }
                    else if (data == 0) {
                        resultInfo.exam.examScore = 0
                        resultInfo.exam.examCount = 0
                        resultInfo.quiz.quizScore = 0
                        resultInfo.quiz.quizCount = 0
                        mongo.postResult(resultInfo, (added)=> {
                            if (added == -1) {
                                cb(-1)
                            }
                            else {
                                cb(added)
                            }
                        })
                    }
                    else {
                        if (data.length > 1) {
                            resultInfo.exam.examScore = data[0].totalScore
                            resultInfo.exam.examCount = data[0].count
                            resultInfo.quiz.quizScore = data[1].totalScore
                            resultInfo.quiz.quizCount = data[1].count
                        }
                        else {
                            resultInfo.exam.examScore = 0
                            resultInfo.exam.examCount = 0
                            resultInfo.quiz.quizScore = data[0].totalScore
                            resultInfo.quiz.quizCount = data[0].count
                        }


                        mongo.postResult(resultInfo, (added)=> {
                            if (added == -1) {
                                cb(-1)
                            }
                            else {
                                cb(added)
                            }
                        })
                    }
                })
            }
        })

    }
    else {
        mongo.postResult(resultInfo, (added)=> {
            if (added == -1) {
                cb(-1)
            }
            else {
                cb(added)
            }
        })
    }
}

module.exports.getExamByLessonId = (lsnId, cb)=> {
    mongo.getExamByLsnId(lsnId, (exam)=> {
        if (exam == -1) {
            cb(-1)
        }
        else if (exam == 0) {
            cb(0)
        }
        else {
            cb(exam)
        }
    })
}

module.exports.getTypeByTypeId = (typeId, cb)=> {
    mongo.getTypeById(typeId, (type)=> {
        if (type == -1) {
            cb(-1)
        }
        else if (type == 0) {
            cb(0)
        }
        else {
            cb(type)
        }
    })
}

module.exports.getTicketTypeById = (depId, cb)=> {
    mongo.getDepartmentById(depId, (type)=> {
        if (type == -1) {
            cb(-1)
        }
        else if (type == 0) {
            cb(0)
        }
        else {
            cb(type)
        }
    })
}

module.exports.getNextLesson = (lsnId, cb)=> {
    module.exports.getLessonById(lsnId, (lesson)=> {
        if (lesson == 0) {
            cb(0)
        }
        else if (lesson == -1) {
            cb(-1)
        }
        else {
            module.exports.getLessonByLvlId(lesson[0].lvlId, (lessonsOfLevel)=> {
                if (lessonsOfLevel == 0) {
                    cb(lesson)
                }
                else if (lessonsOfLevel == -1) {
                    cb(-1)
                }
                else {
                    let length = lessonsOfLevel.length
                    if (lessonsOfLevel[length - 1]._id == lsnId) {
                        module.exports.getLevels((levels)=> {
                            if (levels == -1) {
                                cb(-1)
                            }
                            else if (levels == 0) {
                                cb(0)
                            }
                            else {
                                let newLevel = lesson[0].level
                                for (var i = 0; i < levels.length; i++) {
                                    if (levels[i].order > lesson[0].level.order) {
                                        newLevel = levels[i]
                                        break;
                                    }
                                }

                                module.exports.getLessonByLvlId(newLevel._id, (lessons)=> {
                                    if (lessons == 0) {
                                        cb(lesson)
                                    }
                                    else if (lessons == -1) {
                                        cb(-1)
                                    }
                                    else {
                                        lessons[0].level = newLevel
                                        cb(lessons[0])
                                    }
                                })
                            }
                        })
                    }
                    else {
                        var index = -1;
                        var val = lesson[0]._id
                        let lastIndex = lessonsOfLevel.find(function (item, i) {
                            if (item._id.equals(val)) {
                                index = i;
                                return i;
                            }
                        });
                        let newLesson = lessonsOfLevel[index + 1]
                        if (newLesson) {
                            newLesson.level = lesson[0].level
                            cb(newLesson)
                        }
                        else {
                            cb(lesson[0])
                        }
                    }
                }
            })

        }
    })
}

module.exports.getPreviousLesson = (lsnId, cb)=> {
    module.exports.getLessonById(lsnId, (lesson)=> {
        if (lesson == 0) {
            cb(0)
        }
        else if (lesson == -1) {
            cb(-1)
        }
        else {
            if (lsnId == 0) {
                cb(lesson[0])
            }
            else {
                module.exports.getLessonByLvlId(lesson[0].lvlId, (lessonsOfLevel)=> {
                    if (lessonsOfLevel == 0) {
                        cb(lesson)
                    }
                    else if (lessonsOfLevel == -1) {
                        cb(-1)
                    }
                    else {
                        let length = lessonsOfLevel.length
                        if (lessonsOfLevel[length - 1]._id == lsnId) {
                            if (lessonsOfLevel[length - 2]) {
                                lessonsOfLevel[length - 2].level = lesson[0].level
                                cb(lessonsOfLevel[length - 2])
                            }
                            else {
                                module.exports.getLevels((levels)=> {
                                    if (levels == -1) {
                                        cb(-1)
                                    }
                                    else if (levels == 0) {
                                        cb(0)
                                    }
                                    else {
                                        let newLevel = lesson[0].level
                                        for (var i = 0; i < levels.length; i++) {
                                            if (levels[i].order < lesson[0].level.order) {
                                                newLevel = levels[i]
                                                break;
                                            }
                                        }
                                        module.exports.getLessonByLvlId(newLevel._id, (lessons)=> {
                                            if (lessons == 0) {
                                                cb(lesson)
                                            }
                                            else if (lessons == -1) {
                                                cb(-1)
                                            }
                                            else {
                                                lessons[lessons.length - 1].level = newLevel
                                                cb(lessons[lessons.length - 1])
                                            }
                                        })
                                    }
                                })
                            }
                        }
                        else {
                            var index = -1;
                            var val = lesson[0]._id
                            let lastIndex = lessonsOfLevel.find(function (item, i) {
                                if (item._id.equals(val)) {
                                    index = i;
                                    return i;
                                }
                            });
                            let newLesson = lessonsOfLevel[index - 1]
                            if (newLesson == undefined) {
                                cb(lesson[0])
                            }
                            else {
                                logger.info("newLesssss", lessonsOfLevel)
                                cb(newLesson)
                            }

                        }
                    }
                })

            }

        }
    })
}

module.exports.getPrCrNxtLesson = (lsnId, cb)=> {
    module.exports.getLessonById(lsnId, (lesson)=> {
        if (lesson == 0 || lesson == -1) {
            cb(-1)
        }
        else {

            let prCrNextLesson = []

            module.exports.getPreviousLesson(lsnId, (prLesson)=> {
                if (prLesson == 0 || prLesson == -1) {
                    cb(-1)
                }
                else {
                    delete lesson[0].video
                    delete lesson[0].sound
                    delete lesson[0].text
                    if (!prLesson._id.equals(lesson[0]._id)) {
                        prLesson.position = "previous"
                        prCrNextLesson.push(prLesson)

                    }
                    lesson[0].position = "current"
                    prCrNextLesson.push(lesson[0])
                    module.exports.getNextLesson(lsnId, (nxtLesson)=> {
                        if (nxtLesson == 0 || nxtLesson == -1) {
                            cb(-1)
                        }
                        else {
                            if (!nxtLesson._id.equals(lesson[0]._id)) {
                                nxtLesson.position = "next"
                                prCrNextLesson.push(nxtLesson)

                            }
                            cb(prCrNextLesson)
                        }
                    })
                }
            })
        }
    })

}

module.exports.getQuestionsScoreCountByLesson = (lsnId, cb)=> {
    if (lsnId == 0) {
        module.exports.getFirstLesson((frLesss)=> {
            lsnId = frLesss._id
            module.exports.getExamByLessonId(lsnId, (exam)=> {
                if (exam == -1) {
                    cb(-1)
                }
                else if (exam == 0) {
                    mongo.getQuestionScCntByLsn(lsnId, 0, (question)=> {
                        if (question == -1) {
                            cb(-1)
                        }
                        else if (question == 0) {
                            cb(0)
                        }
                        else {
                            cb(question)
                        }
                    })
                }
                else {
                    mongo.getQuestionScCntByLsn(lsnId, exam._id, (question)=> {
                        if (question == -1) {
                            cb(-1)
                        }
                        else if (question == 0) {
                            cb(0)
                        }
                        else {
                            cb(question)
                        }
                    })
                }
            })
        })
    }
    else {
        module.exports.getExamByLessonId(lsnId, (exam)=> {
            if (exam == -1) {
                cb(-1)
            }
            else if (exam == 0) {
                mongo.getQuestionScCntByLsn(lsnId, 0, (question)=> {
                    if (question == -1) {
                        cb(-1)
                    }
                    else if (question == 0) {
                        cb(0)
                    }
                    else {
                        cb(question)
                    }
                })
            }
            else {
                mongo.getQuestionScCntByLsn(lsnId, exam._id, (question)=> {
                    if (question == -1) {
                        cb(-1)
                    }
                    else if (question == 0) {
                        cb(0)
                    }
                    else {
                        cb(question)
                    }
                })
            }
        })
    }


}

module.exports.answerQuestion = (info, cb)=> {
    //exam
    if (info.type == "exam") {
        if (info.true == true) {
            let updateInfo = {}
            updateInfo.answer = true
            updateInfo.examTimePassed = new Date().getTime()
            updateInfo.questionTrue = 1

            module.exports.getResultByLsnUsr(info.usrId, info.lsnId, (result)=> {
                if (result == -1) {
                    cb(-1)
                }
                else if (result == 0) {
                    cb(0)
                }
                else {
                    if (info.round || result.examRound == true) {
                        updateInfo.exam = {}
                        updateInfo.exam.permission = true
                        updateInfo.type = info.type
                        updateInfo.examRound = true
                        if (info.type == "exam") {

                            updateInfo.exam.newScore = 0

                            if ((result.exam.questionTrue + 1) / result.exam.examCount > 0.6) {
                                let updateInf = {}
                                updateInf.quiz = {}
                                updateInfo.exam.questionTrue = 0
                                // updateInf.answer = true
                                updateInf.exam = {}
                                updateInf.exam.permission = true
                                updateInf.type = info.type
                                updateInf.examRound = true
                                updateInf.exam.newScore = 0
                                module.exports.editResultForAnswerQ(info.usrId, info.lsnId, updateInf, (res)=> {
                                    module.exports.getNextLesson(info.lsnId, (newLesson)=> {
                                        if (newLesson == -1) {
                                            cb(-1)
                                        }
                                        else if (newLesson == 0) {
                                            cb(0)
                                        }
                                        else {
                                            let studentUpdateInfo = {}
                                            if (newLesson._id == info.lsnId) {
                                                cb(newLesson)
                                            }
                                            else {
                                                module.exports.getLessonById(newLesson._id, (lessonDEtails)=> {
                                                    if (lessonDEtails == -1) {
                                                        cb(-1)
                                                    } else if (lessonDEtails == 0) {
                                                        cb(0)
                                                    }
                                                    else {
                                                        studentUpdateInfo.lastPassedLesson = info.lsnId
                                                        module.exports.updateStudent(studentUpdateInfo, info.usrId, (std)=> {
                                                            if (std == -1) {
                                                                cb(-1)
                                                            }
                                                            else if (std == 0) {
                                                                cb(0)
                                                            }
                                                            else {
                                                                let newView = {}
                                                                newView.video = []
                                                                newView.sound = []
                                                                for (var i = 0; i < lessonDEtails[0].video.length; i++) {
                                                                    newView.video[i] = {}
                                                                    newView.video[i]._id = lessonDEtails[0].video[i]._id
                                                                    newView.video[i].viewed = false

                                                                }
                                                                for (var i = 0; i < lessonDEtails[0].sound.length; i++) {
                                                                    newView.sound[i] = {}
                                                                    newView.sound[i]._id = lessonDEtails[0].sound[i]._id
                                                                    newView.sound[i].viewed = false
                                                                }
                                                                newView.lsnId = newLesson._id
                                                                newView.viewPermission = false;

                                                                module.exports.updateViewByUsrId(newView, info.usrId, (updatedResult)=> {
                                                                    if (updatedResult == -1) {
                                                                        cb(-1)
                                                                    }
                                                                    else if (updatedResult == 0) {
                                                                        cb(0)
                                                                    }
                                                                    else {
                                                                        let newResult = {}
                                                                        newResult.usrId = info.usrId
                                                                        newResult.lsnId = newLesson._id
                                                                        newResult.quiz = {}
                                                                        newResult.quiz.time = newLesson.deadline
                                                                        newResult.quiz.questionTrue = 0;
                                                                        newResult.quiz.getScore = 0
                                                                        newResult.quiz.permission = true
                                                                        newResult.exam = {}
                                                                        newResult.timePassed = ""
                                                                        newResult.passedLesson = false
                                                                        module.exports.addResult(newResult, (addedResult)=> {
                                                                            if (addedResult == -1) {
                                                                                cb(-1)
                                                                            }
                                                                            else {
                                                                                cb(addedResult)
                                                                            }
                                                                        })
                                                                    }
                                                                })

                                                            }
                                                        })
                                                    }
                                                })

                                            }


                                        }
                                    })
                                })
                            }
                            else {
                                updateInfo.exam = {}
                                updateInfo.examRound = true
                                // updateInfo.answer = true
                                updateInfo.exam.newScore = 0
                                updateInfo.examTimePassed = new Date().getTime()
                                updateInfo.exam.questionTrue = 0

                                module.exports.editResultForAnswerQ(info.usrId, info.lsnId, updateInfo, (updatedResult)=> {
                                    if (updatedResult == -1) {
                                        cb(-1)
                                    } else if (updatedResult == 0) {
                                        cb(0)
                                    }
                                    else {
                                        cb(updatedResult)
                                    }
                                })
                            }
                        }

                    }
                    else {
                        updateInfo.exam = {}
                        updateInfo.exam.newScore = info.score
                        updateInfo.exam.questionTrue = 1
                        // updateInfo.answer = true
                        updateInfo.type = info.type
                        module.exports.getResultByLsnUsr(info.usrId, info.lsnId, (result)=> {
                            if (result == -1) {
                                cb(-1)
                            }
                            else if (result == 0) {
                                cb(0)
                            }
                            else {
                                if (info.type == "exam") {
                                    if ((result.exam.questionTrue + 1) / result.exam.examCount > 0.6) {
                                        updateInfo.exam = {}
                                        updateInfo.exam.permission = true
                                        // updateInfo.answer = true
                                        updateInfo.type = info.type
                                        module.exports.editResultForAnswerQ(info.usrId, info.lsnId, updateInfo, (updatedResult)=> {
                                            if (updatedResult == -1) {
                                                cb(-1)
                                            } else if (updatedResult == 0) {
                                                cb(0)
                                            }
                                            else {
                                                module.exports.getNextLesson(info.lsnId, (newLesson)=> {
                                                    if (newLesson == -1) {
                                                        cb(-1)
                                                    }
                                                    else if (newLesson == 0) {
                                                        cb(0)
                                                    }
                                                    else {
                                                        let studentUpdateInfo = {}
                                                        if (newLesson._id == info.lsnId) {
                                                            let score = updatedResult.quiz.getScore + updatedResult.exam.getScore
                                                            studentUpdateInfo.score = score
                                                            studentUpdateInfo.lastPassedLesson = newLesson._id
                                                            module.exports.updateStudent(studentUpdateInfo, info.usrId, (std)=> {
                                                                if (std == -1) {
                                                                    cb(-1)
                                                                }
                                                                else if (std == 0) {
                                                                    cb(0)
                                                                }
                                                                else {
                                                                    cb(updatedResult)
                                                                }
                                                            })

                                                        }
                                                        else {
                                                            module.exports.getLessonById(newLesson._id, (lessonDEtails)=> {
                                                                if (lessonDEtails == -1) {
                                                                    cb(-1)
                                                                } else if (lessonDEtails == 0) {
                                                                    cb(0)
                                                                }
                                                                else {
                                                                    studentUpdateInfo.lastPassedLesson = info.lsnId
                                                                    let score = updatedResult.quiz.getScore + updatedResult.exam.getScore
                                                                    studentUpdateInfo.score = score

                                                                    module.exports.updateStudent(studentUpdateInfo, info.usrId, (std)=> {
                                                                        if (std == -1) {
                                                                            cb(-1)
                                                                        }
                                                                        else if (std == 0) {
                                                                            cb(0)
                                                                        }
                                                                        else {
                                                                            let newView = {}
                                                                            newView.video = []
                                                                            newView.sound = []
                                                                            for (var i = 0; i < lessonDEtails[0].video.length; i++) {
                                                                                newView.video[i] = {}
                                                                                newView.video[i]._id = lessonDEtails[0].video[i]._id
                                                                                newView.video[i].viewed = false

                                                                            }
                                                                            for (var i = 0; i < lessonDEtails[0].sound.length; i++) {
                                                                                newView.sound[i] = {}
                                                                                newView.sound[i]._id = lessonDEtails[0].sound[i]._id
                                                                                newView.sound[i].viewed = false
                                                                            }
                                                                            newView.lsnId = newLesson._id
                                                                            newView.viewPermission = false;

                                                                            module.exports.updateViewByUsrId(newView, info.usrId, (updatedResult)=> {
                                                                                if (updatedResult == -1) {
                                                                                    cb(-1)
                                                                                }
                                                                                else if (updatedResult == 0) {
                                                                                    cb(0)
                                                                                }
                                                                                else {
                                                                                    let newResult = {}
                                                                                    newResult.usrId = info.usrId
                                                                                    newResult.lsnId = newLesson._id
                                                                                    newResult.quiz = {}
                                                                                    newResult.quiz.time = newLesson.deadline
                                                                                    newResult.quiz.questionTrue = 0;
                                                                                    newResult.quiz.getScore = 0
                                                                                    newResult.quiz.permission = true
                                                                                    newResult.exam = {}
                                                                                    newResult.timePassed = ""
                                                                                    newResult.passedLesson = false
                                                                                    module.exports.addResult(newResult, (addedResult)=> {
                                                                                        if (addedResult == -1) {
                                                                                            cb(-1)
                                                                                        }
                                                                                        else {
                                                                                            cb(addedResult)
                                                                                        }
                                                                                    })
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
                                    else {

                                        // updateInfo.round = false
                                        // updateInfo.answer = true
                                        updateInfo.exam.newScore = info.score
                                        updateInfo.examTimePassed = new Date().getTime()
                                        module.exports.editResultForAnswerQ(info.usrId, info.lsnId, updateInfo, (updatedResult)=> {
                                            if (updatedResult == -1) {
                                                cb(-1)
                                            } else if (updatedResult == 0) {
                                                cb(0)
                                            }
                                            else {
                                                let score = updatedResult.quiz.getScore + updatedResult.exam.getScore
                                                let updateStu = {}
                                                updatedResult.score = score
                                                module.exports.updateStudent(updateStu, info.usrId, (student)=> {
                                                    cb(updatedResult)

                                                })
                                            }
                                        })
                                    }
                                }
                            }
                        })
                    }

                }
            })
        }
        else {
            let updateInfo = {}
            updateInfo.exam = {}
            // updateInfo.answer = true
            updateInfo.exam.newScore = 0
            updateInfo.exam.questionTrue = 0
            updateInfo.type = info.type
            updateInfo.timePassed = new Date().getTime()
            updateInfo.Score = true
            module.exports.editResultForAnswerQ(info.usrId, info.lsnId, updateInfo, (updatedResult)=> {
                if (updatedResult == -1) {
                    cb(-1)
                } else if (updatedResult == 0) {
                    cb(0)
                }
                else {
                    cb(updatedResult)
                }
            })
        }
    }
    //quiz
    else {
        if (info.true == true) {
            let updateInfo = {}
            // updateInfo.answer = true
            updateInfo.timePassed = new Date().getTime()
            updateInfo.questionTrue = 1
            module.exports.getResultByLsnUsr(info.usrId, info.lsnId, (result)=> {
                if (result == -1) {
                    cb(-1)
                }
                else if (result == 0) {
                    cb(0)
                }
                else {
                    //secondChance
                    logger.info("resultOfUser in true answerQ for quiz", result)
                    if (info.round || result.round == true) {
                        updateInfo.type = info.type
                        updateInfo.round = true
                        updateInfo.quiz = {}
                        updateInfo.quiz.newScore = 0
                        if ((result.quiz.questionTrue + 1) / result.quiz.quizCount > 0.6) {
                            let updateInf = {}
                            updateInf.quiz = {}
                            // updateInf.answer = true
                            updateInf.exam = {}
                            updateInf.exam.permission = true
                            updateInf.type = info.type
                            updateInf.round = true
                            updateInf.quiz.newScore = 0
                            updateInf.quiz.questionTrue = 1
                            updateInf.questionTrue = 1

                            module.exports.editResultForAnswerQ(info.usrId, info.lsnId, updateInf, (res)=> {
                                module.exports.getNextLesson(info.lsnId, (newLesson)=> {
                                    if (newLesson == -1) {
                                        cb(-1)
                                    }
                                    else if (newLesson == 0) {
                                        cb(0)
                                    }
                                    else {
                                        let studentUpdateInfo = {}
                                        if (newLesson._id == info.lsnId) {
                                            cb(newLesson)
                                        }
                                        else {
                                            module.exports.getLessonById(newLesson._id, (lessonDEtails)=> {
                                                if (lessonDEtails == -1) {
                                                    cb(-1)
                                                } else if (lessonDEtails == 0) {
                                                    cb(0)
                                                }
                                                else {
                                                    studentUpdateInfo.lastPassedLesson = info.lsnId
                                                    module.exports.updateStudent(studentUpdateInfo, info.usrId, (std)=> {
                                                        if (std == -1) {
                                                            cb(-1)
                                                        }
                                                        else if (std == 0) {
                                                            cb(0)
                                                        }
                                                        else {
                                                            let newView = {}
                                                            newView.video = []
                                                            newView.sound = []
                                                            for (var i = 0; i < lessonDEtails[0].video.length; i++) {
                                                                newView.video[i] = {}
                                                                newView.video[i]._id = lessonDEtails[0].video[i]._id
                                                                newView.video[i].viewed = false

                                                            }
                                                            for (var i = 0; i < lessonDEtails[0].sound.length; i++) {
                                                                newView.sound[i] = {}
                                                                newView.sound[i]._id = lessonDEtails[0].sound[i]._id
                                                                newView.sound[i].viewed = false
                                                            }
                                                            newView.lsnId = newLesson._id
                                                            newView.viewPermission = false;
                                                            module.exports.updateViewByUsrId(newView, info.usrId, (updatedResult)=> {
                                                                if (updatedResult == -1) {
                                                                    cb(-1)
                                                                }
                                                                else if (updatedResult == 0) {
                                                                    cb(0)
                                                                }
                                                                else {
                                                                    let newResult = {}
                                                                    newResult.usrId = info.usrId
                                                                    newResult.lsnId = newLesson._id
                                                                    newResult.quiz = {}
                                                                    newResult.quiz.time = newLesson.deadline
                                                                    newResult.quiz.questionTrue = 0;
                                                                    newResult.quiz.getScore = 0
                                                                    newResult.quiz.permission = true
                                                                    newResult.exam = {}
                                                                    newResult.timePassed = ""
                                                                    newResult.passedLesson = false
                                                                    module.exports.getResultByLsnUsr(info.usrId, newLesson._id, (existingResult)=> {
                                                                        if (existingResult == -1 || existingResult != 0) {
                                                                            cb(newLesson)
                                                                        }
                                                                        else {
                                                                            module.exports.addResult(newResult, (addedResult)=> {
                                                                                cb(newLesson)
                                                                            })
                                                                        }
                                                                    })

                                                                }
                                                            })

                                                        }
                                                    })
                                                }
                                            })

                                        }


                                    }
                                })
                            })
                        }
                        else {
                            updateInfo.quiz = {}

                            updateInfo.round = true
                            // updateInfo.answer = true
                            updateInfo.quiz.newScore = 0
                            updateInfo.timePassed = new Date().getTime()
                            module.exports.editResultForAnswerQ(info.usrId, info.lsnId, updateInfo, (updatedResult)=> {
                                if (updatedResult == -1) {
                                    cb(-1)
                                } else if (updatedResult == 0) {
                                    cb(0)
                                }
                                else {
                                    cb(updatedResult)
                                }
                            })
                        }
                    }
                    else {
                        updateInfo.quiz = {}
                        updateInfo.quiz.newScore = info.score
                        updateInfo.quiz.questionTrue = 1
                        // updateInfo.answer = true
                        updateInfo.type = info.type
                        module.exports.getResultByLsnUsr(info.usrId, info.lsnId, (result)=> {
                            if (result == -1) {
                                cb(-1)
                            }
                            else if (result == 0) {
                                cb(0)
                            }
                            else {
                                if (info.type == "quiz") {
                                    if ((result.quiz.questionTrue + 1) / result.quiz.quizCount > 0.6) {
                                        updateInfo.exam = {}
                                        updateInfo.exam.permission = true
                                        // updateInfo.answer = true
                                        updateInfo.type = info.type
                                        module.exports.editResultForAnswerQ(info.usrId, info.lsnId, updateInfo, (updatedResult)=> {
                                            if (updatedResult == -1) {
                                                cb(-1)
                                            } else if (updatedResult == 0) {
                                                cb(0)
                                            }
                                            else {
                                                logger.info("updatedResult in editResultForAnswerQ in answerQ", updatedResult)
                                                module.exports.getNextLesson(info.lsnId, (newLesson)=> {
                                                    if (newLesson == -1) {
                                                        cb(-1)
                                                    }
                                                    else if (newLesson == 0) {
                                                        cb(0)
                                                    }
                                                    else {
                                                        let studentUpdateInfo = {}
                                                        logger.info("newLessono", newLesson)
                                                        if (newLesson._id == info.lsnId) {
                                                            let score = updatedResult.quiz.getScore + updatedResult.exam.getScore
                                                            studentUpdateInfo.score = score
                                                            studentUpdateInfo.lastPassedLesson = newLesson._id
                                                            module.exports.updateStudent(studentUpdateInfo, info.usrId, (result)=> {
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
                                                            logger.info("newLessono", newLesson)
                                                            module.exports.getLessonById(newLesson._id, (lesson)=> {
                                                                if (lesson == -1) {
                                                                    cb(-1)
                                                                } else if (lesson == 0) {
                                                                    cb(0)
                                                                }
                                                                else {
                                                                    let score = updatedResult.quiz.getScore + updatedResult.exam.getScore
                                                                    studentUpdateInfo.score = score
                                                                    studentUpdateInfo.lastPassedLesson = info.lsnId
                                                                    studentUpdateInfo.chatrooms = []
                                                                    module.exports.getChatRoomByLessonId(info.lsnId, (lessonChat)=> {
                                                                        if (lessonChat == 0 || lessonChat == -1) {
                                                                            studentUpdateInfo.chatrooms.push({})
                                                                        }
                                                                        else {
                                                                            studentUpdateInfo.chatrooms.push(lessonChat)

                                                                        }
                                                                        module.exports.getChatRoomByLessonId(newLesson._id, (lessonChat1)=> {
                                                                            if (lessonChat1 == 0 || lessonChat1 == -1) {
                                                                                studentUpdateInfo.chatrooms.push({})
                                                                            }
                                                                            else {
                                                                                studentUpdateInfo.chatrooms.push(lessonChat1)

                                                                            }
                                                                            module.exports.getChatRoomByLevelId(newLesson.lvlId, (lessonChat2)=> {
                                                                                if (lessonChat2 == 0 || lessonChat2 == -1) {
                                                                                    studentUpdateInfo.chatrooms.push({})
                                                                                }
                                                                                else {
                                                                                    studentUpdateInfo.chatrooms.push(lessonChat2)
                                                                                }
                                                                                module.exports.updateStudent(studentUpdateInfo, info.usrId, (result)=> {
                                                                                    if (result == -1) {
                                                                                        cb(-1)
                                                                                    }
                                                                                    else if (result == 0) {
                                                                                        cb(0)
                                                                                    }
                                                                                    else {
                                                                                        let newView = {}
                                                                                        newView.lsnId = lesson._id
                                                                                        newView.video = []
                                                                                        newView.sound = []
                                                                                        for (var i = 0; i < lesson.video.length; i++) {
                                                                                            newView.video[i] = {}
                                                                                            newView.video[i]._id = lesson.video[i]._id
                                                                                            newView.video[i].viewed = false
                                                                                        }
                                                                                        for (var i = 0; i < lesson.sound.length; i++) {
                                                                                            newView.sound[i] = {}
                                                                                            newView.sound[i]._id = lesson.sound[i]._id
                                                                                            newView.sound[i].viewed = false
                                                                                        }
                                                                                        module.exports.updateViewByUsrId(newView, info.usrId, (updated)=> {
                                                                                            let resultInfo = {}
                                                                                            resultInfo.usrId = info.usrId
                                                                                            resultInfo.lsnId = lesson._id
                                                                                            resultInfo.quiz = {}
                                                                                            resultInfo.quiz.time = lesson.deadline
                                                                                            resultInfo.quiz.questionTrue = 0;
                                                                                            resultInfo.quiz.getScore = 0
                                                                                            resultInfo.quiz.permission = true
                                                                                            resultInfo.exam = {}
                                                                                            resultInfo.timePassed = ""
                                                                                            resultInfo.passedLesson = false
                                                                                            resultInfo.examRound = false
                                                                                            resultInfo.examTimePassed = ""
                                                                                            module.exports.getResultByLsnUsr(info.usrId, lesson._id, (existingResult)=> {
                                                                                                if (existingResult == -1 || existingResult != 0) {
                                                                                                    cb(lesson)
                                                                                                }
                                                                                                else {
                                                                                                    module.exports.addResult(resultInfo, (addedResult)=> {
                                                                                                        cb(lesson)
                                                                                                    })
                                                                                                }
                                                                                            })

                                                                                        })
                                                                                    }
                                                                                })
                                                                            })

                                                                        })
                                                                    })
                                                                }
                                                            })

                                                        }


                                                    }
                                                })

                                            }
                                        })
                                    }
                                    else {
                                        updateInfo.answer = true
                                        updateInfo.quiz.newScore = info.score
                                        updateInfo.timePassed = new Date().getTime()
                                        module.exports.updateResult(info.usrId, info.lsnId, updateInfo, (updatedResult)=> {
                                            if (updatedResult == -1) {
                                                cb(-1)
                                            } else if (updatedResult == 0) {
                                                cb(0)
                                            }
                                            else {
                                                let score = updatedResult.quiz.getScore + updatedResult.exam.getScore
                                                let updateStu = {}
                                                updateStu.score = score
                                                module.exports.updateStudent(updateStu, info.usrId, (student)=> {
                                                    cb(updatedResult)

                                                })
                                            }
                                        })
                                    }
                                }
                                else {
                                    if (result.exam.questionTrue / result.exam.examCount > 0.06) {
                                        cb(result)
                                    }
                                }

                            }
                        })
                    }

                }
            })
        }
        else {
            let updateInfo = {}
            updateInfo.quiz = {}
            // updateInfo.answer = true
            updateInfo.quiz.newScore = 0
            updateInfo.quiz.questionTrue = 0
            updateInfo.type = info.type
            updateInfo.timePassed = new Date().getTime()
            module.exports.editResultForAnswerQ(info.usrId, info.lsnId, updateInfo, (updatedResult)=> {
                if (updatedResult == -1) {
                    cb(-1)
                } else if (updatedResult == 0) {
                    cb(0)
                }
                else {
                    cb(updatedResult)
                }
            })
        }
    }


}


module.exports.editResultForAnswerQ = (usrId, lsnId, updateInfo, cb)=> {
    //for going to new lesson,update the last result row of the user
    if (lsnId == 0) {
        mongo.editResultForNewLesson(usrId, lsnId, updateInfo, (editedResult)=> {
            if (editedResult == -1) {
                cb(-1)
            }
            else if (editedResult == 0) {
                cb(0)
            }
            else {
                cb(editedResult)
            }
        })
    }
    module.exports.getResultByLsnUsr(usrId, lsnId, (resultOfUser)=> {
        if (resultOfUser == -1) {
            cb(-1)
        }
        else if (resultOfUser == 0) {
            cb(0)
        }
        else {
            logger.info("resultOfUser in asnwerQ editResult in function ", updateInfo)
            //if round2 and no score is count
            if (updateInfo.newScore == 0) {
                delete updateInfo.quiz.newScore
            }
            else {
                if (updateInfo.type == "quiz") {
                    updateInfo.quiz.getScore = parseInt(resultOfUser.quiz.getScore) + parseInt(updateInfo.quiz.newScore)
                    delete updateInfo.quiz.newScore

                }
                else {
                    updateInfo.exam.getScore = parseInt(resultOfUser.exam.getScore) + parseInt(updateInfo.exam.newScore)
                    delete updateInfo.exam.newScore
                }
            }

            //if the answer is true for true question count
            if (updateInfo.questionTrue) {
                if (updateInfo.type == "quiz") {
                    updateInfo.quiz.questionTrue = parseInt(resultOfUser.quiz.questionTrue) + 1
                    delete updateInfo.questionTrue
                }
                else {
                    updateInfo.exam.questionTrue = parseInt(resultOfUser.exam.questionTrue) + 1
                    delete updateInfo.questionTrue
                }
            }
            else {
                delete updateInfo.questionTrue
            }
            let newExam = Object.assign({}, resultOfUser.exam, updateInfo.exam)
            let newQuiz = Object.assign({}, resultOfUser.quiz, updateInfo.quiz)
            let newResult = Object.assign({}, resultOfUser, updateInfo)
            newResult.quiz = newQuiz
            newResult.exam = newExam
            logger.info("info in editReusltForAnswerQ Function", newResult)
            mongo.editResultForAnswerQuestion(usrId, lsnId, newResult, (mongoResult)=> {
                if (mongoResult == -1) {
                    cb(-1)
                }
                else if (mongoResult == 0) {
                    cb(0)
                }
                else {
                    cb(mongoResult)
                }
            })

        }
    })
}

module.exports.updateResult = (usrId, lsnId, updateInfo, cb)=> {
    updateInfo.round = false
    updateInfo.examRound = false
    updateInfo.examTimePassed = ""
    logger.info("updateInfo in updateResult", updateInfo)
    if (!updateInfo.answer) {
        if (lsnId != 0) {
            module.exports.getResultByLsnUsr(usrId, lsnId, (lastResult)=> {
                if (lastResult == -1) {
                    cb(-1)
                }
                else if (lastResult == 0) {
                    module.exports.updateResult(usrId, 0, updateInfo, (updateResult)=> {
                        if (updateResult == -1) {
                            cb(-1)
                        }
                        else if (updateResult == 0) {
                            cb(0)
                        }
                        else {
                            cb(updateResult)
                        }
                    })
                }
                else {
                    logger.info("lastresult in UpdateResult", lastResult)
                    module.exports.getExamByLessonId(lsnId, (exam)=> {
                        if (exam == -1) {
                            cb(-1)
                        }
                        else if (exam == 0) {
                            updateInfo.exam = {}
                            updateInfo.exam.time = 0
                            updateInfo.exam.questionTrue = 0;
                            updateInfo.exam.getScore = 0
                            updateInfo.exam.exId = 0
                            updateInfo.exam.permission = false
                            updateInfo.exam.examScore = 0
                            updateInfo.quiz.quizScore = 0
                            updateInfo.quiz.questionTrue = 0;
                            updateInfo.quiz.getScore = 0
                            updateInfo.quiz.permission = false
                            module.exports.getQuestionsScoreCountByLesson(lsnId, (data)=> {
                                if (data == -1) {
                                    cb(-1)
                                }
                                else if (data == 0) {
                                    updateInfo.exam.examScore = 0
                                    updateInfo.exam.examCount = 0
                                    updateInfo.quiz.quizScore = 0
                                    updateInfo.quiz.quizCount = 0
                                    mongo.editResult(usrId, lsnId, updateInfo, (updatedInfo)=> {
                                        if (updatedInfo == -1) {
                                            cb(-1)
                                        }
                                        else if (updatedInfo == 0) {
                                            cb(0)
                                        }
                                        else {
                                            cb(updatedInfo)
                                        }
                                    });
                                }
                                else {
                                    if (data.length > 1) {
                                        updateInfo.exam.examScore = data[0].totalScore
                                        updateInfo.exam.examCount = data[0].count
                                        updateInfo.quiz.quizScore = data[1].totalScore
                                        updateInfo.quiz.quizCount = data[1].count
                                    }
                                    else {
                                        updateInfo.exam.examScore = 0
                                        updateInfo.exam.examCount = 0
                                        updateInfo.quiz.quizScore = data[0].totalScore
                                        updateInfo.quiz.quizCount = data[0].count
                                    }
                                    mongo.editResult(usrId, lsnId, updateInfo, (updatedInfo)=> {
                                        if (updatedInfo == -1) {
                                            cb(-1)
                                        }
                                        else if (updatedInfo == 0) {
                                            cb(0)
                                        }
                                        else {
                                            cb(updatedInfo)
                                        }
                                    });
                                    // module.exports.getQuestionsScoreCountByLesson(lsnId, (data)=> {
                                    //
                                    //     if (data == -1) {
                                    //         cb(-1)
                                    //     }
                                    //     else if (data == 0) {
                                    //         updateInfo.exam.examScore = 0
                                    //         updateInfo.exam.examCount = 0
                                    //         updateInfo.quiz.quizScore = 0
                                    //         updateInfo.quiz.quizCount = 0
                                    //         mongo.editResult(usrId, lsnId, updateInfo, (updatedInfo)=> {
                                    //             if (updatedInfo == -1) {
                                    //                 cb(-1)
                                    //             }
                                    //             else if (updatedInfo == 0) {
                                    //                 cb(0)
                                    //             }
                                    //             else {
                                    //                 cb(updatedInfo)
                                    //             }
                                    //         });
                                    //
                                    //     }
                                    //     else {
                                    //         if (data.length > 1) {
                                    //             updateInfo.exam.examScore = data[0].totalScore
                                    //             updateInfo.exam.examCount = data[0].count
                                    //             updateInfo.quiz.quizScore = data[1].totalScore
                                    //             updateInfo.quiz.quizCount = data[1].count
                                    //         }
                                    //         else {
                                    //             updateInfo.exam.examScore = 0
                                    //             updateInfo.exam.examCount = 0
                                    //             updateInfo.quiz.quizScore = data[0].totalScore
                                    //             updateInfo.quiz.quizCount = data[0].count
                                    //         }
                                    //
                                    //
                                    //         mongo.editResult(usrId, lsnId, updateInfo, (updatedInfo)=> {
                                    //             if (updatedInfo == -1) {
                                    //                 cb(-1)
                                    //             }
                                    //             else if (updatedInfo == 0) {
                                    //                 cb(0)
                                    //             }
                                    //             else {
                                    //                 cb(updatedInfo)
                                    //             }
                                    //         });
                                    //
                                    //     }
                                    // })

                                }
                            })
                        }
                        else {
                            updateInfo.exam = {}
                            updateInfo.quiz = {}
                            updateInfo.exam.time = exam.time
                            updateInfo.exam.questionTrue = 0;
                            updateInfo.exam.getScore = 0
                            updateInfo.exam.exId = exam._id
                            updateInfo.exam.permission = false
                            updateInfo.quiz.time = exam.time
                            updateInfo.quiz.questionTrue = 0;
                            updateInfo.quiz.getScore = 0
                            updateInfo.quiz.permission = false
                            module.exports.getQuestionsScoreCountByLesson(lsnId, (data)=> {
                                if (data == -1) {
                                    cb(-1)
                                }
                                else if (data == 0) {
                                    updateInfo.exam.examScore = 0
                                    updateInfo.exam.examCount = 0
                                    updateInfo.quiz.quizScore = 0
                                    updateInfo.quiz.quizCount = 0
                                    let newResult = Object.assign({}, lastResult, updateInfo)
                                    mongo.editResult(usrId, lsnId, newResult, (updatedInfo)=> {
                                        if (updatedInfo == -1) {
                                            cb(-1)
                                        }
                                        else if (updatedInfo == 0) {
                                            cb(0)
                                        }
                                        else {
                                            cb(updatedInfo)
                                        }
                                    });

                                }
                                else {
                                    if (data.length > 1) {
                                        updateInfo.exam.examScore = data[0].totalScore
                                        updateInfo.exam.examCount = data[0].count
                                        updateInfo.quiz.quizScore = data[1].totalScore
                                        updateInfo.quiz.quizCount = data[1].count
                                    }
                                    else {
                                        updateInfo.exam.examScore = 0
                                        updateInfo.exam.examCount = 0
                                        updateInfo.quiz.quizScore = data[0].totalScore
                                        updateInfo.quiz.quizCount = data[0].count
                                    }

                                    let newResult = Object.assign({}, lastResult, updateInfo)
                                    mongo.editResult(usrId, lsnId, newResult, (updatedInfo)=> {
                                        if (updatedInfo == -1) {
                                            cb(-1)
                                        }
                                        else if (updatedInfo == 0) {
                                            cb(0)
                                        }
                                        else {
                                            cb(updatedInfo)
                                        }
                                    });

                                }
                            })
                        }
                    })
                }

            })

        }
        else {
            mongo.editResult(usrId, lsnId, updateInfo, (lastResult)=> {
                if (lastResult == -1) {
                    cb(-1)
                }
                else if (lastResult == 0) {
                    cb(0)
                }
                else {
                    console.log("herein=0", lastResult)
                    module.exports.getExamByLessonId(updateInfo.lsnId, (exam)=> {
                        console.log("exam", exam)
                        if (exam == -1) {
                            cb(-1)
                        }
                        else if (exam == 0) {
                            updateInfo.exam = {}
                            updateInfo.quiz = {}
                            updateInfo.exam.time = 0
                            updateInfo.exam.questionTrue = 0;
                            updateInfo.exam.getScore = 0
                            updateInfo.exam.exId = 0
                            updateInfo.exam.permission = false
                            updateInfo.exam.examScore = 0
                            updateInfo.quiz.quizScore = 0
                            updateInfo.quiz.questionTrue = 0;
                            updateInfo.quiz.getScore = 0
                            updateInfo.quiz.permission = false
                            updateInfo.quiz.time = lastResult.value.quiz.time
                            module.exports.getQuestionsScoreCountByLesson(lsnId, (data)=> {
                                if (data == -1) {
                                    cb(-1)
                                }
                                else if (data == 0) {
                                    updateInfo.exam.examScore = 0
                                    updateInfo.exam.examCount = 0
                                    updateInfo.quiz.quizScore = 0
                                    updateInfo.quiz.quizCount = 0
                                    mongo.editResult(usrId, lsnId, updateInfo, (updatedInfo)=> {
                                        if (updatedInfo == -1) {
                                            cb(-1)
                                        }
                                        else if (updatedInfo == 0) {
                                            cb(0)
                                        }
                                        else {
                                            cb(updatedInfo)
                                        }
                                    });
                                }
                                else {
                                    if (data.length > 1) {
                                        updateInfo.exam.examScore = data[0].totalScore
                                        updateInfo.exam.examCount = data[0].count
                                        updateInfo.quiz.quizScore = data[1].totalScore
                                        updateInfo.quiz.quizCount = data[1].count
                                    }
                                    else {
                                        updateInfo.exam.examScore = 0
                                        updateInfo.exam.examCount = 0
                                        updateInfo.quiz.quizScore = data[0].totalScore
                                        updateInfo.quiz.quizCount = data[0].count
                                    }
                                    console.log("here in lsnId", updateInfo)
                                    mongo.editResult(usrId, lsnId, updateInfo, (updatedInfo)=> {
                                        if (updatedInfo == -1) {
                                            cb(-1)
                                        }
                                        else if (updatedInfo == 0) {
                                            cb(0)
                                        }
                                        else {
                                            cb(updatedInfo)
                                        }
                                    });
                                    // module.exports.getQuestionsScoreCountByLesson(lsnId, (data)=> {
                                    //
                                    //     if (data == -1) {
                                    //         cb(-1)
                                    //     }
                                    //     else if (data == 0) {
                                    //         updateInfo.exam.examScore = 0
                                    //         updateInfo.exam.examCount = 0
                                    //         updateInfo.quiz.quizScore = 0
                                    //         updateInfo.quiz.quizCount = 0
                                    //         mongo.editResult(usrId, lsnId, updateInfo, (updatedInfo)=> {
                                    //             if (updatedInfo == -1) {
                                    //                 cb(-1)
                                    //             }
                                    //             else if (updatedInfo == 0) {
                                    //                 cb(0)
                                    //             }
                                    //             else {
                                    //                 cb(updatedInfo)
                                    //             }
                                    //         });
                                    //
                                    //     }
                                    //     else {
                                    //         if (data.length > 1) {
                                    //             updateInfo.exam.examScore = data[0].totalScore
                                    //             updateInfo.exam.examCount = data[0].count
                                    //             updateInfo.quiz.quizScore = data[1].totalScore
                                    //             updateInfo.quiz.quizCount = data[1].count
                                    //         }
                                    //         else {
                                    //             updateInfo.exam.examScore = 0
                                    //             updateInfo.exam.examCount = 0
                                    //             updateInfo.quiz.quizScore = data[0].totalScore
                                    //             updateInfo.quiz.quizCount = data[0].count
                                    //         }
                                    //
                                    //
                                    //         mongo.editResult(usrId, lsnId, updateInfo, (updatedInfo)=> {
                                    //             if (updatedInfo == -1) {
                                    //                 cb(-1)
                                    //             }
                                    //             else if (updatedInfo == 0) {
                                    //                 cb(0)
                                    //             }
                                    //             else {
                                    //                 cb(updatedInfo)
                                    //             }
                                    //         });
                                    //
                                    //     }
                                    // })

                                }
                            })
                        }
                        else {
                            updateInfo.exam = {}
                            updateInfo.quiz = {}
                            updateInfo.exam.time = exam.time
                            updateInfo.exam.questionTrue = 0;
                            updateInfo.exam.getScore = 0
                            updateInfo.exam.exId = exam._id
                            updateInfo.exam.permission = false
                            updateInfo.quiz.time = exam.time
                            updateInfo.quiz.questionTrue = 0;
                            updateInfo.quiz.getScore = 0
                            updateInfo.quiz.permission = false
                            updateInfo.quiz.time = lastResult.quiz.time

                            module.exports.getQuestionsScoreCountByLesson(lsnId, (data)=> {
                                if (data == -1) {
                                    cb(-1)
                                }
                                else if (data == 0) {
                                    updateInfo.exam.examScore = 0
                                    updateInfo.exam.examCount = 0
                                    updateInfo.quiz.quizScore = 0
                                    updateInfo.quiz.quizCount = 0
                                    // let newResult = Object.assign({}, lastResult, updateInfo)
                                    mongo.editResult(usrId, lsnId, updateInfo, (updatedInfo)=> {
                                        if (updatedInfo == -1) {
                                            cb(-1)
                                        }
                                        else if (updatedInfo == 0) {
                                            cb(0)
                                        }
                                        else {
                                            cb(updatedInfo)
                                        }
                                    });

                                }
                                else {
                                    if (data.length > 1) {
                                        updateInfo.exam.examScore = data[0].totalScore
                                        updateInfo.exam.examCount = data[0].count
                                        updateInfo.quiz.quizScore = data[1].totalScore
                                        updateInfo.quiz.quizCount = data[1].count
                                    }
                                    else {
                                        updateInfo.exam.examScore = 0
                                        updateInfo.exam.examCount = 0
                                        updateInfo.quiz.quizScore = data[0].totalScore
                                        updateInfo.quiz.quizCount = data[0].count
                                    }

                                    let newResult = Object.assign({}, lastResult, updateInfo)
                                    mongo.editResult(usrId, lsnId, newResult, (updatedInfo)=> {
                                        if (updatedInfo == -1) {
                                            cb(-1)
                                        }
                                        else if (updatedInfo == 0) {
                                            cb(0)
                                        }
                                        else {
                                            cb(updatedInfo)
                                        }
                                    });

                                }
                            })
                        }
                    })
                }
            });
        }
    }
    else {
        updateInfo.Score = true
        module.exports.getResultByLsnUsr(usrId, lsnId, (lastResult)=> {
            if (lastResult == -1) {
                cb(-1)
            }
            else if (lastResult == 0) {
                cb(0)
            }
            else {
                logger.info("lasResult when answered", lastResult)
                let newExam = Object.assign({}, lastResult.exam, updateInfo.exam)
                let newQuiz = Object.assign({}, lastResult.quiz, updateInfo.quiz)

                let newResult = Object.assign({}, lastResult, updateInfo)
                newResult.exam = newExam
                newResult.quiz = newQuiz
                mongo.editResult(usrId, lsnId, newResult, (updatedInfo)=> {
                    if (updatedInfo == -1) {
                        cb(-1)
                    }
                    else if (updatedInfo == 0) {
                        cb(0)
                    }
                    else {
                        cb(updatedInfo)
                    }
                });
            }
        })
    }

}


module.exports.updateChatroom = (updateInfo, chId, cb)=> {
    module.exports.getChatroomById(chId, (chatroom)=> {
        if (chatroom == -1) {
            cb(-1)
        }
        else if (chatroom == 0) {
            cb(0)
        }
        else {
            let newChatroom = Object.assign({}, chatroom, updateInfo)
            module.exports.updateStudent(newChatroom, 0, (updatedChatroom)=> {
                mongo.editChatRoom(newChatroom, chId, (result)=> {
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

            })
        }
    })

};

module.exports.getChatroomById = (chId, cb)=> {
    mongo.getChatrmById(chId, (result)=> {
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

module.exports.getchatAdminOfChatroom = (chId, cb)=> {
    logger.info("chIdhjhkjhkj", chId)
    mongo.getchatAdminBychatRoom(chId, (result)=> {
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


module.exports.getUserOfChatroom = (chId, cb)=> {
    mongo.getusersOfChatroom(chId, (result)=> {
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

module.exports.getBlockUserOfChatroom = (chId, cb)=> {
    mongo.getBLOCKusersOfChatroom(chId, (result)=> {
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

module.exports.getreportMsgOfChatroom = (chId, cb)=> {
    mongo.getreportedMsgOfChatroom(chId, (result)=> {
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


module.exports.getChatRoomByLessonId = (lsnId, cb)=> {
    mongo.getChatrmBylsnId(lsnId, (result)=> {
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

module.exports.getChatRoomByLevelId = (lvlId, cb)=> {
    mongo.getChatrmByLvlId(lvlId, (result)=> {
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

module.exports.getChatroomByChatAdmin = (caId, cb)=> {
    mongo.getChatRoomByChtAdmn(caId, (result)=> {
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

module.exports.getAllChatrooms = (cb)=> {
    mongo.getAllChatrooms((sups)=> {
        if (sups == -1) {
            cb(-1)
        }
        else if (sups == 0) {
            cb(0)
        }
        else {
            cb(sups)
        }
    })
};

module.exports.delChatroom = (chId, cb)=> {
    mongo.deleteStudentChatroom(chId, (deleted)=> {
        mongo.deleteChatAdminChatroom(chId, (deleted)=> {
            mongo.deleteChatRoom(chId, (result)=> {
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
        })
    })
};

module.exports.addChatroom = (data, cb)=> {
    mongo.postChatRoom(data, (added)=> {
        if (added == -1) {
            cb(-1)
        }
        else {
            data._id = added
            data.warned = 0;
            data.blocked = 0;
            data.blockedTime = ""
            if (!Object.keys(data.lesson).length == 0) {
                modules.exports.addCurrentLessonChatRoom(data, (addedChatroom)=> {
                    module.exports.addPastLessonChatRoom(data, (add)=> {
                        cb(added)
                    })
                })
            }
            else {
                module.exports.addCurrentLevelChatRoom(data, (addedChatLevel)=> {
                    cb(added)
                })
            }
        }
    })
}

module.exports.addCurrentLessonChatRoom = (data, cb)=> {
    data.position = "currentLesson"
    module.exports.getStuByLessonLsnId(data.lesson.value, (student)=> {
        mongo.postCurrentLessonCharoom(student, data, (added)=> {
            if (added == -1) {
                cb(-1)
            }
            else {
                cb(added)
            }
        })
    })
}

module.exports.addPastLessonChatRoom = (data, cb)=> {
    data.position = "passedLesson"
    module.exports.getStuByLessonLsnId(data.lesson.value, (student)=> {
        mongo.postCurrentLessonCharoom(student, data, (added)=> {
            if (added == -1) {
                cb(-1)
            }
            else {
                cb(added)
            }
        })
    })
}

module.exports.addCurrentLevelChatRoom = (data, cb)=> {
    data.position = "currentLevel"
    module.exports.getStuByLevel(data.level.value, (student)=> {
        mongo.postCurrentLessonCharoom(student, data, (added)=> {
            if (added == -1) {
                cb(-1)
            }
            else {
                cb(added)
            }
        })
    })
}


module.exports.updateMessage = (updateInfo, msgId, cb)=> {
    if (msgId == 0) {
        mongo.editUserMsg(updateInfo, updateInfo._id, (result)=> {
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
        module.exports.getMsgById(msgId, (chatroom)=> {
            if (chatroom == -1) {
                cb(-1)
            }
            else if (chatroom == 0) {
                cb(0)
            }
            else {
                mongo.getchatAdminBychatRoom(chatroom.chId, (chatAdmins)=> {
                    if (chatAdmins == -1) {
                        let newMessage = Object.assign({}, chatroom, updateInfo)
                        mongo.editMessage(newMessage, msgId, (result)=> {
                            if (result == -1) {
                                cb(-1)
                            }
                            else if (result == 0) {
                                cb(0)
                            }
                            else {
                                result.chatAdmins = 0
                                cb(result)
                            }
                        })
                    }
                    else {
                        let newMessage = Object.assign({}, chatroom, updateInfo)
                        mongo.editMessage(newMessage, msgId, (result)=> {
                            if (result == -1) {
                                cb(-1)
                            }
                            else if (result == 0) {
                                cb(0)
                            }
                            else {
                                result.chatAdmins = chatAdmins
                                cb(result)
                            }
                        })
                    }

                })

            }
        })
    }
};

module.exports.unpinMessage = (cb)=> {
    mongo.unPinMsg((result)=> {
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


module.exports.delMessageOfChatRoom = (chId, cb)=> {
    mongo.deletechatRoomMessages(chId, (result)=> {
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

module.exports.getMsgOfChatroom = (chId, cb)=> {
    mongo.getMessagOfChatroom(chId, (result)=> {
        if (result == -1) {
            cb(-1)
        }
        else if (result == 0) {
            cb(0)
        }
        else {
            mongo.getMarkChat(chId, (mark)=> {
                if (mark == 0 || mark == -1) {
                    result[0].mark = []
                    mongo.getPinChat(chId, (pin)=> {
                        if (pin == -1 || pin == 0) {
                            result[0].pin = {}
                            cb(result)

                        }
                        else {
                            result[0].pin = pin
                            cb(result)

                        }

                    })
                }
                else {
                    result[0].mark = mark
                    mongo.getPinChat(chId, (pin)=> {
                        if (pin == -1 || pin == 0) {
                            result[0].pin = {}
                            cb(result)

                        }
                        else {
                            result[0].pin = pin
                            cb(result)

                        }

                    })

                }

            })
        }
    })
};

module.exports.getMessagesOfVipUser = (usrId, cb)=> {
    mongo.getMsgOfVipUSR(usrId, (result)=> {
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


module.exports.getMsgById = (msgId, cb)=> {
    mongo.getMessageById(msgId, (result)=> {
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

module.exports.delMessage = (msgId, cb)=> {
    mongo.deleteMsgById(msgId, (result)=> {
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

module.exports.addMessage = (data, cb)=> {
    mongo.postMessage(data, (added)=> {
        if (added == -1) {
            cb(-1)
        }
        else {
            cb(added)
        }
    })
};

module.exports.addVIPMessage = (data, cb)=> {
    mongo.postVipMessage(data, (added)=> {
        if (added == -1) {
            cb(-1)
        }
        else {
            module.exports.getTutorById(data.tutorId, (tutor)=> {
                if (tutor != 0 || tutor != -1) {
                    added.tutor = tutor
                    module.exports.getStuById(data.user, (student)=> {
                        if (student != 0 || student != -1) {
                            added.student = student
                            cb(added)
                        }
                    })
                }
            })
        }
    })
};


module.exports.addMessageReport = (data, cb)=> {
    mongo.postMessageReport(data, (added)=> {
        if (added == -1) {
            cb(-1)
        }
        else {
            cb(added)
        }
    })
};


module.exports.updateTutor = (updateInfo, tId, cb)=> {
    module.exports.getTutorById(tId, (support)=> {
        if (support == -1) {
            cb(-1)
        }
        else if (support == 0) {
            cb(0)
        }
        else {
            if (typeof support.users == "string") {
                support.users = JSON.parse(support.users)
            }
            if (typeof support.levels == "string") {
                support.levels = JSON.parse(support.levels)
            }
            if (typeof updateInfo.users == "string") {
                updateInfo.users = JSON.parse(updateInfo.users)
            }
            if (typeof updateInfo.levels == "string") {
                updateInfo.levels = JSON.parse(updateInfo.levels)
            }
            logger.info("updateInfo", updateInfo)

            let newUsers = Object.assign([], support.users, updateInfo.users)
            let newLevels = Object.assign([], support.levels, updateInfo.levels)

            let newTutor = Object.assign({}, support, updateInfo)
            newTutor.users = newUsers
            newTutor.levels = newLevels
            logger.info("newChatAdmin", newTutor)
            mongo.editTutor(newTutor, tId, (result)=> {
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
    })

};

module.exports.addUserForTutor = (updateInfo, tId, cb)=> {
    mongo.postUserForTutor(updateInfo, tId, (result)=> {
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

module.exports.popUserFromTutors = (updateInfo, cb)=> {
    mongo.popUsrFrmTtr(updateInfo, (result)=> {
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


module.exports.getTutorById = (tId, cb)=> {
    mongo.getTtrById(tId, (result)=> {
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

module.exports.getClosedChatsOfTutor = (tId, cb)=> {
    mongo.getClosedChatsOfTtr(tId, (result)=> {
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

module.exports.getMsgByTutorStudent = (tId, usrId, cb)=> {
    mongo.getMsgByTtrStu(tId, usrId, (result)=> {
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

module.exports.getOpenChatsOfTutor = (tId, cb)=> {
    mongo.getOpenChatsOfTtr(tId, (result)=> {
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


module.exports.getTutorByLevel = (lvlId, cb)=> {
    mongo.getTtrBylvl(lvlId, (result)=> {
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

module.exports.getTutorByUser = (usrId, cb)=> {
    mongo.getTtrByUsr(usrId, (result)=> {
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


module.exports.getTutors = (cb)=> {
    mongo.getAllTutors((sups)=> {
        if (sups == -1) {
            cb(-1)
        }
        else if (sups == 0) {
            cb(0)
        }
        else {
            cb(sups)
        }
    })
};

module.exports.delTutor = (tId, cb)=> {
    mongo.deleteTutor(tId, (result)=> {
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

module.exports.addTutor = (data, cb)=> {
    mongo.postTutor(data, (added)=> {
        if (added == -1) {
            cb(-1)
        }
        else {
            cb(added)
        }
    })
};

module.exports.verifyStu = (data, cb)=> {
    mongo.getVerifyStu(data, (verified)=> {
        if (verified == 0) {
            cb(0)
        }
        else if (verified == -1) {
            cb(-1)
        }
        else {
            cb(verified)
        }
    })
}

module.exports.resendVerifyStu = (info, cb)=> {

    module.exports.getStuById(info._id, (student)=> {
        if (student == 0) {
            cb(0)
        }
        else if (student == -1) {
            cb(-1)
        }
        else {
            let data = {}
            data.usrId = info._id
            data.createdTime = new Date().getTime()
            data.mobile = student.mobile
            data.verifyCode = Math.floor(1000 + Math.random() * 9000)
            module.exports.updateVerifyStu(data, (verified)=> {
                smsPanel.sendVerificationSMS(data, (sent)=> {
                    cb(student)
                })
            })
        }
    })
}

