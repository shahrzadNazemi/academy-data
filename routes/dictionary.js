var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');
let config = require('../util/config')


router.post('/', (req, res)=> {
    database.searchDictionary(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
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

