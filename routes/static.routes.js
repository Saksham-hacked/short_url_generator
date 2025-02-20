const express= require('express');
const router=express.Router();
const {restrictTo}=require("../middleware/auth.middleware.js")

const URL=require("../models/url")


router.get("/admin/urls",restrictTo(["ADMIN"]),async (req,res)=>{
    if(!req.user)return res.redirect("/login");
    const allurls= await URL.find({});
    return res.render("home",{
        urls:allurls
    })
})

router.get("/", restrictTo(["NORMAL","ADMIN"]) ,   async (req,res)=>{
    if(!req.user)return res.redirect("/login");
    const allurls= await URL.find({createdBy:req.user._id});
    return res.render("home",{
        urls:allurls
    })
});

router.get("/signup",async (req,res)=>{

    return res.render("signup")
});

router.get("/login",async (req,res)=>{

    return res.render("login")    
});


module.exports=router;