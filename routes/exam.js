var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');

router.post('/', (req, res)=> {
    database.addExam(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addResult)
        }
    })
});

router.put('/:exId', (req, res)=> {
    database.updateExam(req.body, req.params.exId, (updateResult)=> {
        if (updateResult == -1) {
            res.status(500).end('')
        }
        else if (updateResult == 0) {
            res.status(404).end('')
        }
        else {
            res.json(updateResult)
        }
    })
});

router.delete('/:exId', (req, res)=> {
    database.delExam(req.params.exId, (delResult)=> {
        if (delResult == -1) {
            res.status(500).end('')
        }
        else if (delResult == 0) {
            res.status(404).end('')
        }
        else {
            res.json(delResult)
        }
    })
});

router.get('/:exId', (req, res)=> {
    database.getExamById(req.params.exId, (exam)=> {
        if (exam == -1) {
            res.status(500).end('')
        }
        else if (exam == 0) {
            res.status(404).end('')
        }
        else {
            res.json(exam)
        }
    })
});

router.get('/user/:usrId', (req, res)=> {
    database.getExams(req.params.usrId ,(getResult)=> {
        console.log("getResult")
        if (getResult == -1) {
            res.status(500).end('')
        }
        else {
            
            res.json(getResult)
        }
    })
});


module.exports = router