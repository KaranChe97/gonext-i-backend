const router = require("express").Router();
const { homeDashboard, pendingAmount, revenue, getHomePage } = require("../controllers/analytics");

router.get('/home', homeDashboard);
router.get('/pending', pendingAmount);
router.get('/revenue', revenue); 
router.get('/homepageinit',getHomePage);
// router.post('/delivery', getAllScheduled);
// router.get('/:transactionId', getOne);
// router.patch('/:transactionId', updateStatus);
// router.post('/accept/:transactionId',accept );
// router.post('/cancel/:transactionId', cancel);
// router.delete('/:transactionId', deleteOne); 
// router.post('/settleupall', setUpAll)


module.exports = router;