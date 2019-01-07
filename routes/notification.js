var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');

router.post('/', (req, res)=> {
    database.addNotification(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addResult)
        }
    })
});

router.put('/:NId', (req, res)=> {
    database.updateQuestion(req.body, req.params.QId, (updateResult)=> {
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

router.delete('/:NId', (req, res)=> {
    database.delQuestion(req.params.QId, (delResult)=> {
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

router.get('/:NId', (req, res)=> {
    database.getQuestionById(req.params.QId, (question)=> {
        if (question == -1) {
            res.status(500).end('')
        }
        else if (question == 0) {
            res.status(404).end('')
        }
        else {
            res.json(question)
        }
    })
});

router.get('/', (req, res)=> {
    database.getQuestions((getResult)=> {
        if (getResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(getResult)
        }
    })
});


module.exports = router