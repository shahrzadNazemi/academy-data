
let request = require('request')

module.exports.sendVerificationSMS = (data , cb)=>{
    let info = {}
    info.Code = data.verifyCode;
    info.MobileNumber=data.mobile
    module.exports.getSMSToken((token)=>{
        if(token != -1){
            request.post({
                url: `https://RestfulSms.com/api/VerificationCode`,
                headers: {"content-Type": "application/json" , "x-sms-ir-secure-token":`${token}`},
                body: info,
                json: true
            }, function (err, response, body) {
                if (err) {
                    console.log('err in sending data to database')
                    cb(-1)
                }
                else {
                    console.log("response body", body)
                    cb(body)
                }
            })
        }
        else{
            cb(-1)
        }
    })


}

module.exports.getSMSToken = (cb)=>{
    let info = {}
    info.UserApiKey = "8ee68f78c7e9e3ac713a8719";
    info.SecretKey="asa!#(*ASA"

    request.post({
        url: `https://RestfulSms.com/api/Token`,
        headers: {"content-Type": "application/json" },
        body: info,
        json: true
    }, function (err, response, body) {
        if (body.IsSuccessful == true) {
            cb(body.TokenKey)
        }
            else{
            console.log('err in sending data to smsPanel')
            cb(-1)
        }
    })

}