const listing=require('../models/listing.js');
const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const MapToken=process.env.MAP_TOKEN;
const geocodingClient=mbxGeocoding({accessToken:MapToken});
module.exports.index=async(req,res)=>{
    const alllistings=await listing.find({});
    res.render('./listings/index.ejs',{alllistings});
    };

module.exports.renderNewForm=async(req,res)=>{
        let {id}=req.params;
        const foundlisting = await listing.findById(id)
  .populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  })
  .populate('owner');

        console.log(foundlisting);
        res.render('./listings/show.ejs',{listing:foundlisting});
        currUser: req.user ;
    };

    module.exports.newRoute = async (req, res, next) => {
        try {
            const response = await geocodingClient.forwardGeocode({
                query: req.body.listing.location,
                limit: 1
            }).send();
    
            if (!response.body.features.length) {
                req.flash("error", "Could not find location. Try again.");
                return res.redirect("/listings/new");
            }
    
            const { path: url, filename } = req.file;
            const newlisting = new listing(req.body.listing);
            newlisting.owner = req.user._id;
            newlisting.image = { url, filename };
            newlisting.geometry = response.body.features[0].geometry;
    
            const savedlisting = await newlisting.save();
            console.log(savedlisting);
    
            req.flash('success', "New Listing Created");
            res.redirect('/listings');
        } catch (err) {
            next(err); // This will trigger the error-handling middleware
        }
    };
    

module.exports.getForm=async (req, res) => {
    let { id } = req.params;
    const foundListing = await listing.findById(id); // ✅ renamed variable
    res.render('listings/edit', { listing: foundListing }); // still passing as `listing` to the template
};

module.exports.editform= async (req, res) => {
  
    let { id } = req.params;
let updatedlisting=await listing.findByIdAndUpdate(id,{...req.body.listing });

if(typeof req.file!=='undefined'){
let url=req.file.path;
        let filename=req.file.filename;
        updatedlisting.image={url,filename};
        await updatedlisting.save();
}
    req.flash('success',"Listing Updated");
    res.redirect(`/listings/${id}`);
};


module.exports.deleteform=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success',"New Listing Deleted");
    res.redirect('/listings');


}