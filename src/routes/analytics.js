const router = require("express").Router();
const {homeDashboard} = require("../controllers/analytics");

router.get('/home', homeDashboard);
// router.post('/all', getAll); 
// router.post('/delivery', getAllScheduled);
// router.get('/:transactionId', getOne);
// router.patch('/:transactionId', updateStatus);
// router.post('/accept/:transactionId',accept );
// router.post('/cancel/:transactionId', cancel);
// router.delete('/:transactionId', deleteOne); 
// router.post('/settleupall', setUpAll)


module.exports = router;