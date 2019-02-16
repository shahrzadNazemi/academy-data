var cron = require('node-cron');
var db = require('../database/database')

cron.schedule('12 12 * * *', function () {
    db.closeTicket(new Date().getTime())
});

