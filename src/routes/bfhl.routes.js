const express = require('express');
const { handleBFHL, handleBFHLGet } = require('../controllers/bfhl.controller');

const router = express.Router();

router.post('/', handleBFHL);
router.get('/', handleBFHLGet);

module.exports = router;
