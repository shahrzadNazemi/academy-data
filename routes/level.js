var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');

router.post('/', (req, res)=> {
    database.addLevel(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json({lvlID: addResult})
        }
    })
});

router.put('/:lvlId', (req, res)=> {
    database.updateLevel(req.body, req.params.lvlId, (updateResult)=> {
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

router.delete('/:lvlId', (req, res)=> {
    database.delLevel(req.params.lvlId, (delResult)=> {
        if (delResult == -1) {
            res.status(500).end('')
        }
        else if (delResult == 0) {
            res.status(404).end('')
        }
        else if (delResult == -3) {
            res.status(403).end('')
        }
        else {
            res.json({affectedRows: delResult})
        }
    })
});

router.get('/:lvlId', (req, res)=> {
    database.getLevelById(req.params.lvlId, (level)=> {
        if (level == -1) {
            res.status(500).end('')
        }
        else if (level == 0) {
            res.status(404).end('')
        }
        else {
            res.json(level)
        }
    })
});

router.get('/', (req, res)=> {
    database.getLevels((getResult)=> {
        if (getResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(getResult)
        }
    })
});


module.exports = router