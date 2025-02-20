const express = require('express');
const router = express.Router();
const {createUser,userLogin} = require('../controllers/user.controller.js'); 

router.post("/" , createUser);
router.post("/login" , userLogin);




module.exports = router;
