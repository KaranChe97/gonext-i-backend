const assert = require("assert");
const accountSid = 'ACf5e51b0117f3f5a4b3a092919ef0d7ec';
const authToken = 'c1b2794c623162533876e929482c1490';
const client = require('twilio')(accountSid, authToken);
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
                  res.status(500).send(err);
              } else {
                  console.log("hashed token", otpToken)
                  res.status(200).send({ otpToken: otpToken }) 
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
