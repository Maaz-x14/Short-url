const User = require('../models/users');
const uuid = require('uuid');
const { setUser, getUser } = require('../service/auth');

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

    if(!user){
        return res.render('login', {
            error: 'Invalid Username or password'
        })
    }

    const sessionId = uuid.v4();
    setUser(sessionId, user);
    res.cookie('UID', sessionId);
    // Now we have to make a way to map this sessionId with a user object
    // So we know whose session id is it
    
    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}