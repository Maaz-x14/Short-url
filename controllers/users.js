const User = require('../models/users');
const uuid = require('uuid');
const { setUser } = require('../service/map');

async function handleUserSignup(req,res){
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/login');   
}

async function handleUserLogin(req,res){
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    });
    // Now we have to map sessionId with user, so we use a hashMap  

    if(!user){
        return res.render('login', {    
            error: 'Invalid Username or password'
        })
    }

    // const sessionId = uuid.v4();
    const token = setUser(user);
    res.cookie("uid", token);  // When user logins, we send a token in cookie
    // Now even if server is restarted, we would still be logged in as state is in browser

    // Now we have to make a way to map this sessionId with a user object
    // So we know whose session id is it
    
    // So now whenever we login, a cookie is generated with a sessionId. That sessionId is mapped with a user.
    // So we will use a middleware to find out which user is mapped to that session id using getUser(sessionId),

    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}