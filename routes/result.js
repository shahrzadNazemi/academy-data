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
    });
});

router.get('/:usrId/:lsnId', (req, res)=> {
    database.getResultByLsnUsr(req.params.usrId, req.params.lsnId, (getResult)=> {
        if (getResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(getResult)
        }
    });
});

router.post('/answerQuestion', (req, res)=> {
    console.log("quer in here",req.query)
    if (req.query.round == 2) {
        req.body.round = true
    }
    database.answerQuestion(req.body, (result)=> {
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

})


module.exports = router