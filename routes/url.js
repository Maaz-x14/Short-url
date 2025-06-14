const express = require('express');
const {handleGenerateNewShortUrls, handleGetRoute} = require('../controllers/url')

const router = express.Router();

// Routes
router.post('/', handleGenerateNewShortUrls);
router.get('/:shortId', handleGetRoute);


module.exports = router;