const router = require("express").Router();
const { getAll , getAllByBrainTrust, getOne , create , createMany , edit , deleteOne } = require("../controllers/idea");

router.get('/', getAll);
router.get('/single/:ideaID', getOne);
router.get('/:brainTrust', getAllByBrainTrust);
router.post('/:brainTrust', create);
router.post('/bulk/:brainTrust', createMany);
router.patch('/:ideaID', edit);
router.delete('/:ideaID', deleteOne);

module.exports = router