var cron = require('node-cron');
var db = require('../database/database')

cron.schedule('56 13 * * *', function () {
    db.closeTicket(new Date().getTime())
    db.deleteChatRoomMessage()
    // db.unblockUsers()
});

