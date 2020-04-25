const router = require("express").Router();
const { getAll , getOne , login, create , edit , deleteOne } = require("../controllers/admin");

router.get('/', getAll);
router.get('/:adminID', getOne);
router.post('/', create);
router.post('/login', login);
router.patch('/:adminID', edit);
router.delete('/:adminID', deleteOne);

module.exports = router