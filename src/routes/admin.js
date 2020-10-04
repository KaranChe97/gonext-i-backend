const router = require("express").Router();
const { getAll , getOne , login, create , edit , deleteOne, changePassword, forgetPassword, deleteAdmin } = require("../controllers/admin");
const auth = require("../middleware/auth");
router.get('/all', getAll);
router.get('/', auth, getOne);
router.post('/', create);
router.post('/login', login);
router.patch('/',auth, edit);
router.delete('/deleteAdmin',auth, deleteAdmin);
router.delete('/', auth, deleteOne);
router.patch('/changePassword', auth, changePassword);
router.post('/forgetPassword', forgetPassword);

module.exports = router;