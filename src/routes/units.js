const router = require("express").Router();

const { createMany, getAll } = require('../controllers/units');

router.post('/units', createMany);
router.get('/units', getAll);

module.exports = router;
