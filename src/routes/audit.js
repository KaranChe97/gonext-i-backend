const router = require("express").Router();
const { getAll , getAllByAggregate, getOne , create , createMany , edit , deleteOne } = require("../controllers/audit");

router.get('/', getAllByAggregate);
router.get('/all', getAll);
router.get('/:auditID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:auditID', edit);
router.delete('/:auditID', deleteOne);

module.exports = router