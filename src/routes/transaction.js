const router = require("express").Router();
const auth = require("../middleware/auth");
const { getAll , getAllScheduled, getOne , create , updateStatus , accept, cancel,  deleteOne } = require("../controllers/transactions");

router.post('/create', create);
router.post('/all', getAll); 
router.post('/delivery', getAllScheduled);
router.get('/:transactionId', getOne);
router.patch('/:transactionId', updateStatus);
router.post('/accept/:transactionId',accept );
router.post('/cancel/:transactionId', cancel);
router.delete('/:transactionId', deleteOne); 

module.exports = router;