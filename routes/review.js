const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js");
const {isLoggedIn,isAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
     if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }   
};

//Reviews
//Post route for adding review
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.postCreateReviewRequest));

//Delete Review

router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.destroyReviewRequest));

module.exports = router;