const router = require("express").Router();
const { CreateTag , getAll, editTag, deleteTag } = require('../controllers/tags');

router.get('/',getAll);
router.post('/',CreateTag );
router.patch('/', editTag);
router.delete('/',deleteTag);

module.exports = router;