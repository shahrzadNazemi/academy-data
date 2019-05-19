
let password =encodeURIComponent( "rahasa!@#")
module.exports.mongoURL = `mongodb://userAdmin:${password}@localhost:27017`;
    // mongodb://username:password@localhost:27017/exampledatabase
