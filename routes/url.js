const express = require('express');
const {handleGenerateNewShortUrls, handleGetRoute, handleGetAnalytics} = require('../controllers/url')

const router = express.Router();

// Routes
router.post('/', handleGenerateNewShortUrls);
router.get('/:shortId', handleGetRoute);
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;