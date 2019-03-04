var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');


router.post('/', (req, res)=> {
    database.addMessage(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addResult)
        }
    })

});


router.put('/:msgId', (req, res)=> {
    if(req.body.pinned){
        database.unpinMessage((updated)=>{
            database.updateMessage(req.body, req.params.msgId, (result)=> {
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
    }
    else{
        database.updateMessage(req.body, req.params.msgId, (result)=> {
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

    }
});

router.delete('/:msgId', (req, res)=> {
    database.delMessage(req.params.msgId, (result)=> {
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

router.delete('/chatRoom/:chId', (req, res)=> {
    database.delMessageOfChatRoom(req.params.chId, (result)=> {
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


router.get('/chatRoom/:chId', (req, res)=> {
    database.getMsgOfChatroom(req.params.chId, (result)=> {
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
