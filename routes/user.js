const express = require('express');
const router = express.Router();
const User=require('../models/user.js');
const passport=require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController=require('../controllers/users.js');




router.route('/signup')
.get(userController.SignupGet)
.post(userController.Signup);


// router.get('/signup',userController.SignupGet);


// router.post('/signup',userController.Signup)


router.route('/login')
.get(userController.loginRender)
.post(saveRedirectUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),userController.login);


// router.get('/login',userController.loginRender);


// router.post('/login',saveRedirectUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),userController.login)

module.exports=router;

router.get('/logout',userController.logout);
