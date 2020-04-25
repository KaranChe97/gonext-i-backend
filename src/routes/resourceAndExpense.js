const router = require("express").Router();
const { getAll , getOne , create , createMany , edit , deleteOne } = require("../controllers/resourceAndExpense");

router.get('/', getAll);
router.get('/:resourceAndExpenseID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:resourceAndExpenseID', edit);
router.delete('/:resourceAndExpenseID', deleteOne);

module.exports = router