const { getUser } = require('../service/map')

async function restrictToLoggedInUsersOnly(req,res,next){
    const userUid = req.cookies.uid;
    // Here we got the sessionId, now we find which user is mapped to this sessionId;
    if(!userUid) return res.redirect('/login');

    const user = getUser(userUid);
    if(!user) return res.redirect('/login');

    req.user = user;  // This would be passed to the next
    next();
}

async function checkAuth(req,res,next){
    const userUid = req.cookies.uid;

    const user = getUser(userUid);

    req.user = user;  // This would be passed to the next
    next();
}

module.exports = {
    restrictToLoggedInUsersOnly,
    checkAuth
}