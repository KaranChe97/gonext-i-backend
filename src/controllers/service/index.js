const assert = require("assert");
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const {  getOne } = require("../../model/admin");
const { generateHash , compareData } = require("../../common/hash");
var AWS = require('aws-sdk');

const service = {};
var rand = function(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  };

service.sendOtp = async (req, res, next) => { 
    try {
        console.log('SendOtp called');
        var verificationCode = rand(1000, 9999);
        let otpToken = await generateHash(verificationCode);
        var params = {
            to: `+91${req.body.phonenumber}`,
            from: '+12057406474', // Your twilio phone number
            body: `Your verification code for gonext-i is ${verificationCode}`,
          };
        const data = await getOne(req.body.phonenumber);
        if(req.body.type === 'forget') {
            if(data) {
                res.status(200).send({ 
                    status: 1,
                    type: req.body.type,
                    otpToken,
                    verificationCode
              }) 
                // client.messages.create(params, (err, message) => {
                //     if(err) {
                //         console.log(err);
                //         res.status(200).send(err);
                //     } else {
                //         res.status(200).send({ 
                //             status: 1,
                //             type: req.body.type,
                //             otpToken: otpToken,
                //     }) 
                //     }
                // })       
            } else {
                res.status(200).send({
                    status : 2,
                    message : 'Account not exist'
                })
            }
        } else if(req.body.type === 'signup') {
            if(data) {
                res.status(200).send({
                    status : 2,
                    message: 'Account already exist'
                })
            } else {
                res.status(200).send({ 
                    status: 1,
                    type: req.body.type,
                    otpToken,
                    verificationCode
              }) 
        //   client.messages.create(params, (err, message) => {
        //       if(err) {
        //           console.log(err);
        //           res.status(200).send(err);
        //       } else {
        //           res.status(200).send({ 
        //               status: 1,
        //               type: req.body.type,
        //               otpToken: otpToken
        //         }) 
        //       }
        //   })       
        }
        } else {
            res.status(200).send({
                status: 0,
                message: 'type is invalid'
            })
        }

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
        res.status(200).send({ status : 1, isVerified : isVerified, type: req.body.type });
    } catch(e) {
        next(e);
    }
}

service.awsOtp = async(req,res,next) => {
    try {
        console.log("Number = " + req.body.phonenumber);
        var verificationCode = rand(1000, 9999);
        let otpToken = await generateHash(verificationCode);

        var params = {
            Message: `OTP for gonext-i ${verificationCode}`,
            PhoneNumber: '+91 '+req.body.phonenumber ,
            MessageAttributes: {
                'AWS.SNS.SMS.SenderID': {
                    'DataType': 'String',
                    'StringValue': 'gonexti'
                },
                'AWS.SNS.SMS.SMSType': {
                    'DataType': 'String', 
                    'StringValue': 'Transactional'
                },
            }
        };
    
        var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
        publishTextPromise.then(
            function (data) {
                res.end(JSON.stringify({ 
                    status: 1,
                    type: req.body.type,
                    otpToken: otpToken,
                    MessageID: data.MessageId,
                 }));
            }).catch(
                function (err) {
                    res.end(JSON.stringify({ Error: err }));
                });
    } catch(e) {
        next(e);
    } 
}

module.exports = service;
