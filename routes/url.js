const express = require('express');
const {handleGenerateNewShortUrls} = require('../controllers/url')

const router = express.Router();

// Routes
router.post('/', handleGenerateNewShortUrls);



module.exports = router;