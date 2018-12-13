var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');


router.post('/admin/login', (req, res) => {
    database.loginForAdmin(req.body, (result)=> {
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

router.put('/admin/:admId', (req, res) => {
    database.updateAdmin(req.body, req.params.admId, (result)=> {
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

router.get('/admin', (req, res) => {
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

router.delete('/admin/:admId', (req, res) => {
    database.delAdmin(req.params.admId, (result)=> {
        if (result == -1) {
            res.status(500).end('')
        }
        else if (result == 0) {
            res.status(404).end('')
        }
            else if(result == -4){
            res.status(403).end('')
        }
        else {
            res.json(result)
        }
    })
});

router.post('/admin', (req, res)=> {
    database.addAdmin(req.body, (addedAdmin)=> {
        if (addedAdmin == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addedAdmin)
        }
    })
});

router.get('/admin/:admId', (req, res) => {
    database.getAdminById(req.params.admId , (result)=> {
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



router.post('/student' , (req, res)=>{
    database.addStudent(req.body , (result)=>{
        if(result == -1){
            res.status(500).end('')
        }
        else{
            res.json(result)
        }
    })
});

router.post('/student/login', (req, res) => {
    database.loginForStudent(req.body, (result)=> {
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

router.put('/student/:stuId', (req, res) => {
    console.log(req.params.stuId)
    database.updateStudent(req.body, req.params.stuId, (result)=> {
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

router.get('/student', (req, res) => {
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

router.get('/student/best', (req, res) => {
    database.getAllStu((result)=> {
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


router.get('/student/:stdId', (req, res) => {
    database.getStuById(req.params.stdId , (result)=> {
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


router.delete('/student/:stuId', (req, res) => {
    database.delAdmin(req.params.admId, (result)=> {
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