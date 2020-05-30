const router = require("express").Router();
const auth = require("../middleware/auth");
const { getAll , getOne , create , edit , deleteOne } = require("../controllers/my_users");

router.post('/', create);
router.get('/all', getAll); 
router.get('/:userId', getOne);
router.patch('/:userId', edit);
router.delete('/:userId', deleteOne); 

module.exports = router