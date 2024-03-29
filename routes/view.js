var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');

router.post('/', (req, res)=> {
    database.addView(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json({lvlID: addResult})
        }
    })
});

router.put('/:lsnId', (req, res)=> {
    database.updateViewToInsert(req.body, req.params.lsnId, (updateResult)=> {
        if (updateResult == -1) {
            res.status(500).end('')
        }
        else if (updateResult == 0) {
            res.status(404).end('')
        }
        else {
            res.json(updateResult)
        }
    });
});

router.put('/:lsnId/:usrId', (req, res)=> {
    database.updateViewToSetTrue(req.body, req.params.lsnId, req.params.usrId, (updateResult)=> {
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

router.get('/video/:vdId/:usrId', (req, res)=> {
    
    database.updateViewToSetTrue(req.params.vdId,req.params.usrId , 'video', (view)=> {
        if (view == -1) {
            res.status(500).end('')
        }
        else if (view == 0) {
            res.status(404).end('')
        }
        else {
            res.json(view)
        }
    })
});

router.get('/sound/:sndId/:usrId', (req, res)=> {
    database.updateViewToSetTrue(req.params.sndId,req.params.usrId , 'sound', (view)=> {
        if (view == -1) {
            res.status(500).end('')
        }
        else if (view == 0) {
            res.status(404).end('')
        }
        else {
            res.json(view)
        }
    })
});

router.get('/user/:usrId', (req, res)=> {
    database.getViewOfUsr(req.params.usrId , (view)=> {
        if (view == -1) {
            res.status(500).end('')
        }
        else if (view == 0) {
            res.status(404).end('')
        }
        else {
            res.json(view)
        }
    })
});

module.exports = router
