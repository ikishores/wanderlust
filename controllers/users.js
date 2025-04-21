const User=require('../models/user.js');
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash('success','You are Logged out!');
        res.redirect('/listings');
    });
}




module.exports.login=async(req,res)=>{
    req.flash('success',"welcome to wanderlust !You are logged in!");
    res.redirect(res.locals.redirectUrl || '/listings');
    
    }



module.exports.loginRender=(req,res)=>{
    res.render('users/login.ejs');
};



module.exports.SignupGet=(req,res)=>{
    res.render('users/signup.ejs');
};



module.exports.Signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newuser=new User({username,email});
       const registerUser= await User.register(newuser,password);
       console.log(registerUser);
       req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash('success','Welcome to wanderlust!');
       res.redirect('/listings');
       });
       
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }
    

};


