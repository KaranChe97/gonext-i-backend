const router = require("express").Router();
const auth = require("../middleware/auth");
const { create, getAll, displayNested, listSub, shiftParent, editCategory, deleteCategory } = require("../controllers/categories");

router.get('/', getAll);
router.get('/sub', listSub);
router.post('/', create);
router.post('/moveCategory', shiftParent);
router.patch('/', editCategory);
router.delete('/', deleteCategory);
// router.get('/:itemId',auth, getOne);
// router.patch('/:itemId',auth, edit);
// router.delete('/:itemId', deleteOne);
 
module.exports = router