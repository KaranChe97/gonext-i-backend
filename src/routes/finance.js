const router = require("express").Router();
const { getAll , getOne , create , createMany , edit , deleteOne } = require("../controllers/finance");

router.get('/', getAll);
router.get('/:financeID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:financeID', edit);
router.delete('/:financeID', deleteOne);

module.exports = router