const router = require("express").Router();
const { getAll , getOne , create , createMany , edit , deleteOne } = require("../controllers/valueChain");

router.get('/', getAll);
router.get('/:valueChainID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:valueChainID', edit);
router.delete('/:valueChainID', deleteOne);

module.exports = router