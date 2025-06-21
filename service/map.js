const jwt = require('jsonwebtoken');
const secretKey = 'hairy_nigga$635';  // Used to make tokens

function setUser(user){
    // First we would set up payload to make a token for
    // But we dont need id, so we can directly send payload of user
    // const payload = {    
    //     id,
    //     ...user
    // }
    const payload = {
        _id: user._id,
        email: user.email
    };

    // We have to payload along with secret key(stamp)
    // Whoever knows the secretKey can make a token for its payload
    return jwt.sign(payload, secretKey);
}
     
function getUser(token){
    if(!token){
        return null;
    }
    try {
        return jwt.verify(token, secretKey);    
    } catch (error) {
        return null;
    }
    
}

module.exports = {
    setUser, 
    getUser
}