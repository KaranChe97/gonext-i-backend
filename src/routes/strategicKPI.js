const router = require("express").Router();
const { getAll , getOne , create , createMany , edit , deleteOne } = require("../controllers/strategicKPI");

router.get('/', getAll);
router.get('/:strategicKPIID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:strategicKPIID', edit);
router.delete('/:strategicKPIID', deleteOne);

module.exports = router