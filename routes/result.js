var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');

router.post('/', (req, res)=> {
    database.addQuestion(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else if (addResult == -2) {
            res.status(403).end('')
        }
        else if (addResult == -3) {
            res.status(402).end('')
        }
        else {
            res.json(addResult)
        }
    })
});

router.put('/:QId', (req, res)=> {
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

router.delete('/:QId', (req, res)=> {
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

router.get('/:QId', (req, res)=> {
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

router.get('/:usrId/:lsnId', (req, res)=> {
    database.getResultByLsnUsr(req.params.usrId , req.params.lsnId ,(getResult)=> {
        if (getResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(getResult)
        }
    })
});


module.exports = router