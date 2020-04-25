const router = require("express").Router();
const { getAll , getOne , create , createMany , edit , deleteOne } = require("../controllers/operationalMetric");

router.get('/', getAll);
router.get('/:operationalMetricID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:operationalMetricID', edit);
router.delete('/:operationalMetricID', deleteOne);

module.exports = router