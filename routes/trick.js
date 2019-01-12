var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');

router.post('/', (req, res)=> {
    database.addTrick(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addResult)
        }
    })
});

router.put('/:trckId', (req, res)=> {
    database.updateTrick(req.body, req.params.trckId, (updateResult)=> {
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

router.get('/:trckId', (req, res)=> {
    database.getTrickById(req.params.trckId, (trick)=> {
        if (trick == -1) {
            res.status(500).end('')
        }
        else if (trick == 0) {
            res.status(404).end('')
        }
        else {
            res.json(trick)
        }
    })
});

router.get('/', (req, res)=> {
    database.getAllTrick((getResult)=> {
        if (getResult == -1) {
            res.status(500).end('')
        }
        else if(getResult == 0){
            res.status(404).end('')
        }
        else {
            res.json(getResult)
        }
    })
});

router.delete('/:trckId', (req, res)=> {
    database.delTrick(req.params.trckId, (delResult)=> {
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


module.exports = router