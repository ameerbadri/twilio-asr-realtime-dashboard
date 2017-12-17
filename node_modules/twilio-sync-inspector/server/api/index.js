const { Router } = require('express');

const rest = require('./rest');

const router = Router();

router.get('/token', require('./token'));
router.get('/services', rest.getServices);
router.get('/services/:sid', rest.getDataStructures);

module.exports = router;
