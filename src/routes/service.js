const router = require("express").Router();
const { sendOtp , receiveOtp, awsOtp } = require("../controllers/service");


router.post('/sendOtp', sendOtp);

router.post('/receiveOtp', receiveOtp);

router.post('/awsOtp', awsOtp);

module.exports = router