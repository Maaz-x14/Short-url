const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/', async (req,res)=>{
    const allURLs = await URL.find({});
    res.render('home', {
        urls: allURLs
    });
})

router.get('/signup', async (req,res)=>{
    res.render('signup');
})


module.exports = router;