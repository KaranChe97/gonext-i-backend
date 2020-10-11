const router = require("express").Router();
const auth = require("../middleware/auth");
const { getAll, getOne, create, createMany, edit, deleteOne, getVariant, addVariant, editVariant, deleteVariant } = require("../controllers/inventory");

router.get('/', auth, getAll);
router.post('/',auth, create);
router.get('/variant/:variantId', auth, getVariant);
router.post('/variant/:itemId', auth, addVariant);
router.patch('/variant/:itemId', auth, editVariant)
router.delete('/variant/:itemId', auth, deleteVariant)
router.get('/:itemId',auth, getOne);
router.post('/bulk', createMany);
router.patch('/:itemId',auth, edit);
router.delete('/:itemId', deleteOne);
 
module.exports = router