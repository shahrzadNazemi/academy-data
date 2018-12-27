var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');


router.post('/', (req, res) => {
    database.addLesson(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == -2) {
            res.status(403).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/video', (req, res) => {
    database.addVideo(req.body, (result)=> {
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

router.post('/sound', (req, res) => {
    database.addSound(req.body, (result)=> {
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

router.post('/type', (req, res) => {
    database.addType(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == -2) {
            res.status(403).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});


router.put('/:lsnId', (req, res) => {
    database.updateLesson(req.body, req.params.lsnId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    });
});

router.put('/video/:vdId', (req, res) => {
    database.updateVideo(req.body, req.params.vdId, (result)=> {
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

router.put('/sound/:sndId', (req, res) => {
    database.updateSound(req.body, req.params.sndId, (result)=> {
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


router.get('/level/:lvlId', (req, res) => {
    database.getLessonByLvlId(req.params.lvlId, (result)=> {
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

router.get('/:lsnId/video', (req, res) => {
    database.getAdmins((result)=> {
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

router.get('/type', (req, res)=> {
    database.getAllTpe((types)=> {
        if (types == -1) {
            res.status(500).end()
        }
        else if (types == 0) {
            res.status(404).end()
        }
        else {
            res.json(types)

        }
    })
})

router.get('/video', (req, res)=> {
    database.getAllVideos((videos)=> {
        if (videos == -1) {
            res.status(500).end()
        }
        else if (videos == 0) {
            res.status(404).end()
        }
        else {
            for (var i = 0; i < videos.length; i++) {
                videos[i].lesson = videos[i].lesson[0]
                videos[i].type = videos[i].type[0]
            }
            res.json(videos)

        }
    })
})


router.get('/:lsnId', (req, res) => {
    database.getLessonById(req.params.lsnId, (result)=> {
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

router.get('/:lsnId/sound', (req, res) => {
    database.getAdmins((result)=> {
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

router.get('/:lsnId/video/:lvlId', (req, res) => {
    database.getVideoByLVLLSN(req.params.lvlId, req.params.lsnId, (result)=> {
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

router.get('/:lsnId/sound/:lvlId', (req, res) => {
    database.getSoundByLVLLSN(req.params.lvlId, req.params.lsnId, (result)=> {
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

router.get('/video/:vdId', (req, res) => {
    database.getVdById(req.params.vdId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            for (var i = 0; i < result.length; i++) {
                result[i].lesson = result[i].lesson[0]
                result[i].type = result[i].type[0]
            }
            res.json(result)
        }
    })
});

router.get('/sound/:sndId', (req, res) => {
    database.getSndById(req.params.sndId, (result)=> {
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
    database.getAllLessons((lessons)=> {
        if (lessons == -1) {
            res.status(500).end()
        }
        else if (lessons == 0) {
            res.status(404).end()
        }
        else {
            for (var i = 0; i < lessons.length; i++) {
                lessons[i].level = lessons[i].level[0]
            }
            res.json(lessons)

        }
    })
})



router.delete('/:lsnId', (req, res) => {
    database.delLesson(req.params.lsnId, (result)=> {
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

router.delete('/video/:vdId', (req, res) => {
    database.delVideo(req.params.vdId, (result)=> {
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

router.delete('/sound/:sndId', (req, res) => {
    database.delSound(req.params.sndId, (result)=> {
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
