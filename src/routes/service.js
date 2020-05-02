const router = require("express").Router();
const { sendOtp , receiveOtp} = require("../controllers/service");


router.post('/sendOtp', sendOtp);

router.post('/receiveOtp', receiveOtp);

module.exports = router