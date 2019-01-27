var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');


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
            resultInfo.exam ={}
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

router.put('/student/:stuId', (req, res) => {
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

router.get('/student/bestLevel/:lsnId', (req, res) => {
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


module.exports = router