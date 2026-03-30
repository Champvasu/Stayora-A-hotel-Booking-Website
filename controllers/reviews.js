const Listing = require("../Models/listing");
const Review = require("../Models/review");
const ExpressError = require("../utils/ExpressError");

module.exports.postCreateReviewRequest = async(req,res) =>{
   let listing = await Listing.findById(req.params.id);

   if(!listing){
    throw new ExpressError(404,"Listing not found");
   }
   
   let newReview = new Review(req.body.review);//new document based on reviews because Review(new) contains all review model field 
   newReview.author = req.user._id; 
   listing.reviews.push(newReview);
   /*console.log(newReview);*/
   await newReview.save();
   await listing.save();

    req.flash("success", "review Created!");

   console.log("new review saved");
  //res.send("new review saved");
   res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReviewRequest = async(req,res)=>{
   
    let {id,reviewId} = req.params;

   await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);

   req.flash("success", "Review Deleted!");
   res.redirect(`/listings/${id}`);
};