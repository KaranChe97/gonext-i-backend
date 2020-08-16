const { refresh } = require('../controllers/refresh_token');
const router = require("express").Router();


router.get('/refresh/:refreshToken', refresh);


module.exports = router