const express = require('express');
const { handleHealth } = require('../controllers/health.controller');

const router = express.Router();

router.get('/', handleHealth);

module.exports = router;
