const router = require("express").Router();
const { getAll , getOne , create , createMany , edit , deleteOne } = require("../controllers/brainTrust");

router.get('/', getAll);
router.get('/:brainTrustID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:brainTrustID', edit);
router.delete('/:brainTrustID', deleteOne);

module.exports = router