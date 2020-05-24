const router = require("express").Router();
const auth = require("../middleware/auth");
const { getAll, getOne , create , createMany , edit , deleteOne } = require("../controllers/inventory");

router.get('/', auth, getAll);
router.post('/',auth, create);
router.get('/:itemId',auth, getOne);
router.post('/bulk', createMany);
router.patch('/:itemId',auth, edit);
router.delete('/:itemId', deleteOne);

module.exports = router