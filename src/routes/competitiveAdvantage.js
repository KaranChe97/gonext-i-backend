const router = require("express").Router();
const { getAll , getOne , create , createMany , edit , deleteOne } = require("../controllers/competitiveAdvantage");

router.get('/', getAll);
router.get('/:competitiveAdvantageID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:competitiveAdvantageID', edit);
router.delete('/:competitiveAdvantageID', deleteOne);

module.exports = router