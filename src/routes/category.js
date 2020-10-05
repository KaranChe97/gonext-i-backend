const router = require("express").Router();
const { Create, getAll, editCategory, deleteCategory } = require('../controllers/categories');

router.get('/', getAll);
router.post('/', Create);
router.patch('/', editCategory);
router.delete('/', deleteCategory);

module.exports = router