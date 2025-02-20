const jwt = require('jsonwebtoken');

const secret = "Saksham@#1234";

// Function to create a token
function setUser(user) {
    
    return jwt.sign({
        _id: user?._id,
        email: user?.email
        ,role:user?.role
    }, secret); 
}

// Function to verify a token
function getUser(token) {
    try {
        if (!token) {
            
            return null;
        }
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT Error:", err.message);
        return null;
    }
}

module.exports = { setUser, getUser };


















// const sessionIdToUserMap=new Map();//statefull
// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user);
// }
// function getUser(id) {
//     return sessionIdToUserMap.get(id);
// }

// module.exports = { setUser, getUser };///this is like a diary


//is there any problem with this code?

