var express = require('express');
var router = express.Router();
var database = require('../database/database');
let logger = require('../util/logger');
let config = require('../util/config')
let lesson = require('../routes/lesson')
let fs = require('fs');


router.post('/', (req, res)=> {
    database.addTicket(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addResult)
        }
    })
});

router.post('/type', (req, res)=> {
    database.addTypeOfTicket(req.body, (addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addResult)
        }
    })
});

router.get('/type', (req, res)=> {
    database.getAllTktTypes((addResult)=> {
        if (addResult == -1) {
            res.status(500).end('')
        }
        else {
            res.json(addResult)
        }
    })
});



router.put('/:tktId', (req, res)=> {
    database.updateTicket(req.body, req.params.tktId, (result)=> {
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

router.delete('/:tktId', (req, res)=> {
    database.delExam(req.params.exId, (exam)=> {
        if (exam == -1) {
            response.InternalServer('مشکلی در سرور پیش آمده است.لطفا دوباره تلاش کنید.', {}, (result)=> {
                res.json(result)
            })
        }
        else if (exam == 0) {
            response.respondNotFound('سوال مورد نظر یافت نشد.', {}, (result)=> {
                res.json(result)
            })
        }
        else {
            response.respondDeleted('اطلاعات با موفقیت حذف شد.', exam, (result)=> {
                res.json(result)

            })


        }
    })
});

router.get('/student/:stdId', (req, res)=> {
    database.getTicketByStuId(req.params.stdId, (ticket)=> {
        if (ticket == -1) {
            res.status(500).end('')
        }
        else if (ticket == 0) {
            res.status(404).end('')
        }
        else {
            res.json(ticket)
        }
    })

});

router.get('/supporter/:supId', (req, res)=> {
    database.getTicketBySupId(req.params.supId, (ticket)=> {
        if (ticket == -1) {
            res.status(500).end('')
        }
        else if (ticket == 0) {
            res.status(404).end('')
        }
        else {
            res.json(ticket)
        }
    })

});

router.get('/:tktId', (req, res)=> {
    database.getTicketById(req.params.tktId, (ticket)=> {
        if (ticket == -1) {
            res.status(500).end('')
        }
        else if (ticket == 0) {
            res.status(404).end('')
        }
    
        else {
            database.getStuById(ticket.usrId , (student)=>{
                if(student == -1 || student ==0){
                    ticket.student = {}
                }
                else {
                    ticket.student = student
                    database.getSupportById(ticket.supId , (supporter)=>{
                        if(supporter == -1 || supporter==0){
                            ticket.supporter ={}
                        }
                        else{
                            ticket.supporter = supporter
                        }
                        res.json(ticket)

                    })
                }
            })
        }
    })
});

router.get('/all/:supId', (req, res)=> {
    database.getAllTickets(req.params.supId ,(ticket)=> {
        if (ticket == -1) {
            res.status(500).end('')
        }
        else if (ticket == 0) {
            res.status(404).end('')
        }
        else {
            res.json(ticket)
        }
    })

});

module.exports = router

