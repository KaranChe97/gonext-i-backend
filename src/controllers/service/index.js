const assert = require("assert");
const accountSid = process.env.TWILIO_SID; 
console.log(accountSid)
const authToken = process.env.TWILIO_AUTH;
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const { getAll, getOne, getByID, createOne, edit, deleteOne } = require("../../model/service");
const serviceModel = require("../../model/service/model");
const { generateHash , compareData } = require("../../common/hash");

const service = {};
var rand = function(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  };

service.sendOtp = async (req, res, next) => {
    try {
        console.log('SendOtp called');
        var verificationCode = rand(100000, 999999);

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
                  console.log("hashed token", otpToken)
                  res.status(200).send({ 
                      status: 1,
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
        res.send({ status : 200, isVerified : isVerified });
    } catch(e) {
        next(e);
    }
}

module.exports = service;
