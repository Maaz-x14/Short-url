const shortId = require('short-id');
const URL = require('../models/url');

async function handleGenerateNewShortUrls(req,res){
    const short_id = shortId.generate();
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: "URL required"})
    }

    await URL.create({
        shortId: short_id,
        redirectUrl: body.url,
        visitHistory: [],

    })
    
    return res.json({id: short_id}).status(201);
}

module.exports = {
    handleGenerateNewShortUrls
}