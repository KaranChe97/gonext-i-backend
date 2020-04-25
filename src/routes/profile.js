const router = require("express").Router();
const { getAll , getAllByBrainTrust, getOne , create , createMany , edit , deleteOne } = require("../controllers/profile");

router.get('/', getAll);
router.get('/single/:profileID', getOne);
router.get('/:brainTrust', getAllByBrainTrust);
router.post('/:brainTrust', create);
router.post('/bulk/:brainTrust', createMany);
router.patch('/:profileID', edit);
router.delete('/:profileID', deleteOne);

module.exports = router