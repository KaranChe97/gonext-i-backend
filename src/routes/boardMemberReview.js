const router = require("express").Router();
const { getAll, create} = require("../controllers/boardMemberReview");

router.get('/:name', getAll);
router.post('/', create);

module.exports = router