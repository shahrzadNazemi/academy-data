var cron = require('node-cron');
var db = require('../database/database')

cron.schedule('22 16 * * *', function () {
    db.closeTicket(new Date().getTime())
});

