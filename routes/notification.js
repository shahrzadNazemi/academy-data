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
    database.updateNotification(req.body, req.params.NId, (updateResult)=> {
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
    database.delNotification(req.params.NId, (delResult)=> {
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
    database.getNotificationById(req.params.NId , (notification)=> {
        if (notification == -1) {
            res.status(500).end('')
        }
        else if (notification == 0) {
            res.status(404).end('')
        }
        else {
            res.json(notification)
        }
    })
});

router.get('/', (req, res)=> {
    database.getNotifications((getResult)=> {
        if (getResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(getResult)
        }
    })
});


module.exports = router