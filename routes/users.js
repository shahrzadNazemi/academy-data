var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');
let smsPanel = require('../util/smsPanel')


router.post('/admin/login', (req, res) => {
    database.loginForAdmin(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.put('/admin/:admId', (req, res) => {
    database.updateAdmin(req.body, req.params.admId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/admin', (req, res) => {
    database.getAdmins((result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.delete('/admin/:admId', (req, res) => {
    database.delAdmin(req.params.admId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else if (result == -4) {
            res.status(403).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/admin', (req, res)=> {
    database.addAdmin(req.body, (addedAdmin)=> {
        if (addedAdmin == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addedAdmin)
        }
    })
});

router.get('/admin/:admId', (req, res) => {
    database.getAdminById(req.params.admId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});


router.put('/supporter/:supId', (req, res) => {
    database.updateSupporter(req.body, req.params.supId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/supporter', (req, res) => {
    database.getSupporters((result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.delete('/supporter/:supId', (req, res) => {
    database.delSupporter(req.params.supId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/supporter', (req, res)=> {
    database.addSupporter(req.body, (addedSupport)=> {
        if (addedSupport == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addedSupport)
        }
    })
});

router.get('/supporter/:supId', (req, res) => {
    database.getSupportById(req.params.supId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});


router.put('/chatAdmin/:caId', (req, res) => {
    database.updateChatAdmin(req.body, req.params.caId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/chatAdmin', (req, res) => {
    database.getChatAdmins((result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.delete('/chatAdmin/:caId', (req, res) => {
    database.delChatAdmin(req.params.caId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/chatAdmin', (req, res)=> {
    database.addChatAdmin(req.body, (addedSupport)=> {
        if (addedSupport == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addedSupport)
        }
    })
});

router.get('/chatAdmin/:caId', (req, res) => {
    database.getChatAdminById(req.params.caId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.put('/tutor/popStu', (req, res) => {
    database.popUserFromTutors(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.put('/tutor/:tId', (req, res) => {
    database.updateTutor(req.body, req.params.tId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.put('/tutor/:tId/student', (req, res) => {
   
    database.addUserForTutor(req.body, req.params.tId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});


router.get('/tutor', (req, res) => {
    database.getTutors((result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/tutor/level/:lvlId', (req, res) => {
    database.getTutorByLevel(req.params.lvlId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/tutor/student/:usrId', (req, res) => {
    database.getTutorByUser(req.params.usrId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/tutor/:trId/closedChat', (req, res) => {
    database.getClosedChatsOfTutor(req.params.trId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/tutor/:trId/openChat', (req, res) => {
    database.getOpenChatsOfTutor(req.params.trId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});



router.delete('/tutor/:tId', (req, res) => {
    database.delTutor(req.params.tId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/tutor', (req, res)=> {
    database.addTutor(req.body, (addedSupport)=> {
        if (addedSupport == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addedSupport)
        }
    })
});

router.get('/tutor/:tId', (req, res) => {
    database.getTutorById(req.params.tId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});


router.post('/student', (req, res)=> {
    database.addStudent(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == -2) {
            res.status(403).end('')
        }
        else {
            let resultInfo = {}
            resultInfo.exam = {}
            resultInfo.quiz = {}
            resultInfo.exam.examScore = 0
            resultInfo.exam.permission = false
            resultInfo.exam.exId = 0
            resultInfo.lsnId = req.body.lastPassedLesson;
            resultInfo.usrId = result
            resultInfo.passedLesson = false;
            resultInfo.timePassed = ""
            resultInfo.exam.examCount = 0
            resultInfo.exam.getScore = 0
            resultInfo.exam.time = 0
            resultInfo.exam.questionTrue = 0

            resultInfo.quiz.time = 0
            resultInfo.quiz.questionTrue = 0
            resultInfo.quiz.permission = 0
            resultInfo.quiz.quizScore = 0
            resultInfo.quiz.quizCount = 0
            database.addResult(resultInfo, (result1)=> {
                res.json(result)
            })
        }
    })
});

router.post('/student/verification', (req, res)=> {
    database.verifyStu(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == -2) {
            res.status(403).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/student/resendVerification', (req, res)=> {
    console.log("body in resend" , req.body)
    database.resendVerifyStu(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == -2) {
            res.status(403).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/student/forgetPassVerify', (req, res)=> {
    console.log("body in resend" , req.body)
    database.verifyStu(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == -2) {
            res.status(403).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/student/forgetPass', (req, res)=> {
    console.log("body in forgetPass" , req.body)
    let data = {}
    data.usrId = req.body._id
    data.createdTime = new Date().getTime()
    data.mobile = req.body.mobile
    data.verifyCode = Math.floor(1000 + Math.random() * 9000)
    database.addVerifyStu(data, (verified)=> {
        smsPanel.sendVerificationSMS(data, (sent)=> {
            res.json(verified)
        })
    })
});




router.post('/student/login', (req, res) => {
    database.loginForStudent(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/student/placement', (req, res) => {
    database.stuPlacement(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            console.log("result", result)

            res.json(result)
        }
    })
});

router.get('/student/placement/:usrId', (req, res) => {
    database.getStuPlacement(req.params.usrId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            console.log("result", result)

            res.json(result)
        }
    })
});


router.get('/student/username/:username', (req, res) => {
    database.getStuByUsername(req.params.username, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});


router.put('/student/:stuId', (req, res) => {
    logger.info("updateStu body" , req.body)
    database.getStuById(req.params.stuId, (student)=> {
        if (student == -1) {
            res.status(500).end('')
        }
        else if (student == 0) {
            res.status(404).end('')
        }
        else {
            let newStu = Object.assign({}, student, req.body)
            console.log(newStu, student)
            database.updateStudent(newStu, req.params.stuId, (result)=> {
                if (result == -1) {
                    res.status(500).end('')
                }
                else if (result == 0) {
                    res.status(404).end('')
                }
                else if (result == -2) {
                    res.status(402).end('')
                }

                else {
                    res.json(result)
                }
            })
        }
    })
});


router.get('/student/prCrNxt/lesson/:lsnId', (req, res) => {
    database.getPrCrNxtLesson(req.params.lsnId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/student', (req, res) => {
    database.getAdmins((result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/student/best', (req, res) => {
    database.getAllStu((result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/student/level/:lvlId', (req, res) => {
    database.getStuByLevel(req.params.lvlId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});


router.get('/student/:usrId/lesson', (req, res) => {
    database.getStuByLesson(req.params.usrId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/student/lesson/:lsnId', (req, res) => {
    database.getStuByLessonLsnId(req.params.lsnId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});


router.get('/student/:stdId', (req, res) => {
    database.getStuById(req.params.stdId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/student/mobile/:mobile', (req, res) => {
    database.getStuByMobile(req.params.mobile, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});



router.delete('/student/:stuId', (req, res) => {
    console.log(req.params.stuId)
    database.delStudent(req.params.stuId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});


router.put('/cp/:cpId', (req, res) => {
    database.updateCp(req.body, req.params.cpId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.get('/cp', (req, res) => {
    database.getCps((result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.delete('/cp/:cpId', (req, res) => {
    database.delCp(req.params.cpId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else if (result == -4) {
            res.status(403).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/cp', (req, res)=> {
    database.addCp(req.body, (addedAdmin)=> {
        if (addedAdmin == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addedAdmin)
        }
    })
});

router.get('/cp/:cpId', (req, res) => {
    database.getCpById(req.params.cpId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});


module.exports = router