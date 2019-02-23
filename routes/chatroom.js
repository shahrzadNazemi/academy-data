var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');


router.post('/', (req, res)=> {
    database.addChatroom(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addResult)
        }
    })
    
});

router.put('/:chId', (req, res)=> {
            database.updateChatroom(req.body, req.params.chId, (result)=> {
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

router.delete('/:chId', (req, res)=> {
    database.delChatroom(req.params.chId, (result)=> {
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

router.get('/student/:stdId', (req, res)=> {
    database.getChatroomByStuId(req.params.stdId, (result)=> {
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

router.get('/chatAdmin/:caId', (req, res)=> {
    database.getChatroomByChatAdmin(req.params.caId, (result)=> {
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

router.get('/:chId', (req, res)=> {
    database.getChatroomById(req.params.chId, (result)=> {
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

router.get('/', (req, res)=> {
    database.getAllChatrooms((result)=> {
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
