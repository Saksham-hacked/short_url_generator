//startefull


// const User = require("../models/user.js")
// const { v4 :uuidv4 } = require('uuid') ;
// const {getUser,setUser} =require("../service/auth.js")


// async function createUser(req, res) {
//     const {name, email, password} = req.body;
//     await User.create({
//         name,
//         email,
//         password
//     })
//     return res.render("login");

// }
// async function userLogin(req, res) {
//     const {email, password} = req.body;
//     const user=await User.findOne({email,password});
//     if(!user){
//          response.render("login",{
//             error:"invalid credentials"
//          });
//     }
//     const sessionId=uuidv4();//we have to store this session id with user object
//     setUser(sessionId,user);
//     res.cookie("uid",sessionId);
//     return res.redirect("/");
// }

// module.exports = {createUser, userLogin};



//stateless
const User = require("../models/user.js")
const { v4 :uuidv4 } = require('uuid') ;
const {getUser,setUser} =require("../service/auth.js")


async function createUser(req, res) {
    const {name, email, password} = req.body;
    const user=User.findOne({email});
    if(user){
        return res.render("signup",
            {
                error:"This email is already in use",
            }
        );
    }
    await User.create({
        name,
        email,
        password
    })
    return res.render("login");

}
async function userLogin(req, res) {
    const {email, password} = req.body;
    const user=await User.findOne({email,password});
    if(!user){
         return res.render("login",{
            error:"invalid credentials"
         });
    }
   
    const token=setUser(user);

    res.cookie("token",token);
    // return res.json({token});
    return res.redirect("/");
}

module.exports = {createUser, userLogin};