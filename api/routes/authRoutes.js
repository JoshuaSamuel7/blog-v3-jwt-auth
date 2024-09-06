const User=require('../models/user');
const express=require('express');
const router=express.Router();
const authControllers=require('../controllers/Authcontrollers');

router.post("/login",authControllers.postLogin);
router.post("/register",authControllers.postRegister);
router.get("/current_user",authControllers.currentUser);
router.get("/logout",authControllers.logoutUser);
module.exports=router;