const router = require("express").Router();
const { getAll , getAllByAggregate, getOne , create , createMany , edit , deleteOne } = require("../controllers/boardEffectiveness");

router.get('/', getAllByAggregate);
router.get('/all', getAll);
router.get('/:boardEffectivenessID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:boardEffectivenessID', edit);
router.delete('/:boardEffectivenessID', deleteOne);

module.exports = router