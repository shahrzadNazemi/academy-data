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
        else if (result == -3) {
            res.status(402).end('')
        }

        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    });
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

router.post('/file', (req, res) => {
    database.addFile(req.body, (result)=> {
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
        else if (result == -3) {
            res.status(402).end('')
        }

        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/text', (req, res) => {
    database.addText(req.body, (result)=> {
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

router.post('/note', (req, res) => {
    database.addNote(req.body, (result)=> {
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

router.post('/category', (req, res) => {
    database.addCategory(req.body, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else {
            res.json(result)
        }
    })
});


router.put('/:lsnId', (req, res) => {
    database.updateLesson(req.body, req.params.lsnId, (result)=> {
        console.log(result)
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else if (result == -3) {
            res.status(403).end('')
        }
        else if (result == -2) {
            res.status(402).end('')
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

router.put('/file/:flId', (req, res) => {
    database.updateFile(req.body, req.params.flId, (result)=> {
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

router.put('/text/:txtId', (req, res) => {
    database.updateText(req.body,req.params.txtId , (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.put('/note/:ntId', (req, res) => {
    database.updateNote(req.body,req.params.ntId , (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else {
            res.json(result)
        }
    })
});



router.get('/:lsnId/note/:usrId', (req, res) => {
    database.getNotes(req.params.lsnId ,req.params.usrId ,(result)=> {
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

router.get('/next/:lsnId', (req, res) => {
    database.getNextLesson(req.params.lsnId, (result)=> {
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


router.get('/:lsnId/next', (req, res) => {
    database.getNextLesson(req.params.lsnId, (result)=> {
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
});

router.get('/type/:typeId', (req, res)=> {
    database.getTypeByTypeId(req.params.typeId ,(types)=> {
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
});

router.get('/category', (req, res)=> {
    database.getAllCats((types)=> {
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
});

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
});

router.get('/sound', (req, res)=> {
    database.getAllSounds((sounds)=> {
        if (sounds == -1) {
            res.status(500).end()
        }
        else if (sounds == 0) {
            res.status(404).end()
        }
        else {
            for (var i = 0; i < sounds.length; i++) {
                sounds[i].lesson = sounds[i].lesson[0]
                sounds[i].type = sounds[i].type[0]
            }
            res.json(sounds)
        }
    })
})

router.get('/text/:txtId', (req, res)=> {
    database.getTextById(req.params.txtId ,(text)=> {
        if (text == -1) {
            res.status(500).end()
        }
        else if (text == 0) {
            res.status(404).end()
        }
        else {
            res.json(text)

        }
    })
})

router.get('/text', (req, res)=> {
    database.getAllText((texts)=> {
        if (texts == -1) {
            res.status(500).end()
        }
        else if (texts == 0) {
            res.status(404).end()
        }
        else {
            for (var i = 0; i < texts.length; i++) {
                texts[i].lesson = texts[i].lesson[0]
                texts[i].type = texts[i].type[0]
            }
            res.json(texts)

        }
    })
});

router.get('/first', (req, res)=> {
    database.getFirstLesson((texts)=> {
        if (texts == -1) {
            res.status(500).end()
        }
        else if (texts == 0) {
            res.status(404).end()
        }
        else {
           
            res.json(texts)

        }
    })
});

router.get('/file', (req, res)=> {
    database.getAllFiles((sounds)=> {
        if (sounds == -1) {
            res.status(500).end()
        }
        else if (sounds == 0) {
            res.status(404).end()
        }
        else {
            // for (var i = 0; i < sounds.length; i++) {
            //     sounds[i].lesson = sounds[i].lesson[0]
            //     sounds[i].type = sounds[i].type[0]
            // }
            res.json(sounds)
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

router.get('/file/:flId', (req, res) => {
    database.getFileById(req.params.flId, (result)=> {
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


router.get('/:lsnId/file', (req, res) => {
    database.getFileByLessonId(req.params.lsnId ,(result)=> {
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




router.get('/sound/:sndId', (req, res) => {
    database.getSndById(req.params.sndId, (result)=> {
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
});




router.delete('/:lsnId', (req, res) => {
    database.delLesson(req.params.lsnId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else if (result == -2) {
            res.status(402).end('')
        }
        else if (result == -3) {
            res.status(403).end('')
        }

        else {
            res.json(result)
        }
    })
});

router.delete('/type/:typeId', (req, res) => {
    database.delType(req.params.typeId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else if (result == -2) {
            res.status(402).end('')
        }
        else if (result == -3) {
            res.status(403).end('')
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

router.delete('/file/:flId', (req, res) => {
    database.delFile(req.params.flId, (result)=> {
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

router.delete('/text/:txtId', (req, res) => {
    database.delText(req.params.txtId, (result)=> {
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

router.delete('/note/:ntId', (req, res) => {
    database.delNote(req.params.ntId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
        else {
            res.json({"delete":result})
        }
    })
});

module.exports = router
