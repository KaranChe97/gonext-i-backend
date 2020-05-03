const assert = require("assert");
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const { generateHash , compareData } = require("../../common/hash");

const service = {};
var rand = function(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  };

service.sendOtp = async (req, res, next) => {
    try {
        console.log('SendOtp called');
        var verificationCode = rand(1000, 9999);
        var params = {
            to: `+91${req.body.phonenumber}`,
            from: '+12057406474', // Your twilio phone number
            body: `Your verification code for gonext-i is ${verificationCode}`,
          };

          let otpToken = await generateHash(verificationCode);

          client.messages.create(params, (err, message) => {
              if(err) {
                  console.log(err);
                  res.status(200).send(err);
              } else {
                  res.status(200).send({ 
                      status: 1,
                      type: req.body.type,
                      otpToken: otpToken
                }) 
              }
          })       

    } catch(e) {
        next(e);
    }
}

service.receiveOtp = async (req,res,next) => {
    try {
        let isVerified = false;
        let validCode = await compareData(req.body.verificationCode,req.body.otpToken);
        if(validCode) {
            isVerified = true;
        } 
        res.send({ status : 200, isVerified : isVerified, type: req.body.type });
    } catch(e) {
        next(e);
    }
}

module.exports = service;
