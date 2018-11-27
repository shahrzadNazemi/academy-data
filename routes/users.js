var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');


router.post('/admin/login', (req, res) => {
database.loginForAdmin(req.body , (result)=>{
    if(result == -1){
        res.status(500).end('')
    }
    else if(result == 0){
        res.status(404).end('')
    }
    else{
        res.json(result)
    }
})
})


module.exports = router