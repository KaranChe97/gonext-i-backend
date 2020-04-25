const router = require("express").Router();
const { getAll , getOne , create , createMany , edit , deleteOne } = require("../controllers/basicMeasure");

router.get('/', getAll);
router.get('/:basicMeasureID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:basicMeasureID', edit);
router.delete('/:basicMeasureID', deleteOne);

module.exports = router