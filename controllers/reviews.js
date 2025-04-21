const Review=require('../models/reviews.js');
const listing=require('../models/listing.js');

module.exports.isReview=async (req, res) => {
    const foundListing = await listing.findById(req.params.id);
    if (!foundListing) {
        return res.status(404).send("Listing not found");
    }

    const newReview = new Review(req.body.review);
    foundListing.reviews.push(newReview);

    await newReview.save();
    await foundListing.save();
    
    res.redirect(`/listings/${foundListing._id}`);
};

