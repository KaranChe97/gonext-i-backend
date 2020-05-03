const router = require("express").Router();
const { getAll , getOne , login, create , edit , deleteOne, changePassword, forgetPassword, deleteAdmin } = require("../controllers/admin");

router.get('/', getAll);
router.get('/:adminID', getOne);
router.post('/', create);
router.post('/login', login);
router.patch('/:adminID', edit);
router.delete('/deleteAdmin', deleteAdmin);
router.delete('/:adminID', deleteOne);
router.patch('/changePassword/:adminID', changePassword);
router.post('/forgetPassword', forgetPassword);

module.exports = router