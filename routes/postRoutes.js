const express=require('express');
const router=express.Router();
const Postcontrollers=require('../controllers/Postcontrollers');
const passport=require('passport');
require('../config/passport');
router.get("/posts",Postcontrollers.getposts);
router.post("/compose",passport.authenticate('jwt', { session: false }),Postcontrollers.createPost);

module.exports=router;