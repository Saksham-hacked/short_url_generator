
const {getUser}=require("../service/auth.js")

function checkForAuthentication(req,res,next){
    
    const tokencookie=req.cookies?.token;
   if(!tokencookie)return next();


    const token=tokencookie;
    const user=getUser(token);
    req.user = user;
    next();

}

function restrictTo(roles=[]){
    return function(req, res, next){
        if(!req.user){
            return res.redirect("/login");
        }
        if(!roles.includes(req.user.role)){
            return res.end("You are not authorized to access this resource");
        }
        return next();

    }

}

module.exports={checkForAuthentication
    ,restrictTo
};