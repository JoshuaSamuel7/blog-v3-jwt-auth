const User=require('../models/user');
const express=require('express');
const router=express.Router();
const authControllers=require('../controllers/Authcontrollers');
const passport=require("../config/passport")
router.post("/login",authControllers.postLogin);
router.post("/register",authControllers.postRegister);
router.get("/current_user",passport.authenticate('jwt', { session: false }),authControllers.currentUser);
router.get("/logout",passport.authenticate('jwt', { session: false }),authControllers.logoutUser);
module.exports=router;