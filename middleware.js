const listing=require('./models/listing.js')
module.exports.isLoggedin = (req, res, next) => {
   // console.log(req.path,'..',req.originalUrl);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You must be logged in to create a listing');
        return res.redirect('/login');
    }
    next(); // ✅ This line is required!
};


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
    let Aulisting = await listing.findById(id);

if (!Aulisting || !Aulisting.owner || Aulisting.owner.toString() !== res.locals.currentUser._id.toString()) {
    req.flash('error', "You are not the owner of the listing");
    return res.redirect(`/listings/${id}`);
}
next();


}





