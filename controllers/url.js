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
        redirectURL: body.url,
        visitHistory: [],

    })
    
    return res.render('home', {
        id: short_id
    });
}

async function handleGetRoute(req,res){
    const id = req.params.shortId;
    // We pass 2 objects, first has id which we are finding
    // Other we are updating, we are pushing in an array, so use $push

    // Returns a document/row
    const entry = await URL.findOneAndUpdate({
        shortId: id
    }, { $push: {
        visitHistory: { timestamp: Date.now()}
        }
    }
    )
    res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req,res){
    const id = req.params.shortId;
    const result = await URL.findOne({shortId: id});
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
}

module.exports = {
    handleGenerateNewShortUrls,
    handleGetRoute,
    handleGetAnalytics
}