const URL=require("../models/url.js")
//imstalling nanoid for creating shortid
const shortid = require("shortid")




async function generateNEwShortUrl(req,res){
   const body=req.body;

   if(!body||!body.url){
    return res.status(400).json({message:"Invalid request"})
   } 
   const allurls=await URL.find({createdBy:req.user._id});
   const shortID=shortid(8);
   await URL.create({
    shortId: shortID,
    redirectUrl:req.body.url,
    visitHistory:[],
    createdBy:req.user._id//this user comes from th e middleware injecting user
})
   // return res.json({shortID});
   return res.render("home",{
      id:shortID,
      urls:allurls

   })
}



async function handlegetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId})
      if(!result){
         return res.status(404).send("Not found")
      }
      return res.json({
         totalClicks:result.visitHistory.length,
         Analytics:result.visitHistory
      })

   
   }

module.exports ={
    generateNEwShortUrl,
    handlegetAnalytics}