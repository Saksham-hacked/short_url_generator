const express= require('express');
    const {generateNEwShortUrl,handlegetAnalytics} = require('../controllers/url.controller.js')
    

const router=express.Router();

router.post("/",generateNEwShortUrl);

router.get("/analytics/:shortId",handlegetAnalytics);

module.exports=router;