const router = require("express").Router();
const { getAll , getOne , create , createMany , edit , deleteOne } = require("../controllers/pipeline");

router.get('/', getAll);
router.get('/:pipelineID', getOne);
router.post('/', create);
router.post('/bulk', createMany);
router.patch('/:pipelineID', edit);
router.delete('/:pipelineID', deleteOne);

module.exports = router