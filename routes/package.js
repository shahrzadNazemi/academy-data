var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');


router.post('/', (req, res)=> {
    database.addPackage(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addResult)
        }
    })

});

router.put('/:pgId', (req, res)=> {
        database.updatePackage(req.body, req.params.pgId, (result)=> {
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

router.delete('/:pgId', (req, res)=> {
    database.delPackage(req.params.pgId, (result)=> {
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

router.get('/:pgId', (req, res)=> {
    database.getPackageById(req.params.pgId, (result)=> {
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
    database.getAllPackages((result)=> {
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
