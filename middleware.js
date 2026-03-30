const Listing = require("./Models/listing");
const Review = require("./Models/review");
const { listingSchema } = require("./schema");   // ✅ ADD THIS
const ExpressError = require("./utils/ExpressError"); // ✅ ADD THIS
const multer = require("multer");

module.exports.validateListing = (req,res,next)=>{
     console.log("Validating listing with data:", req.body);
     let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        console.log(" VALIDATION ERROR:", errMsg);
        throw new ExpressError(400,errMsg);
    }else{
        console.log("Validation passed");
        next();
    }
};

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
    
        
        //if user is not logged in 
        req.session.redirectUrl = /*req.originalUrl*/`/listings/${req.originalUrl}`;
        req.flash("error","you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{

    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();
}

module.exports.isOwner = async (req,res,next)=>{
let {id} = req.params;

let listing = await Listing.findById(id);
if(!listing.owner.equals(res.locals.currUser._id)){
req.flash("error","You don't have permission to edit");
return res.redirect(`/listings/${id}`);
}
next();
}

module.exports.isAuthor = async (req,res,next)=>{
let {id,reviewId} = req.params;

let review = await Review.findById(reviewId);

if(!review.author.equals(res.locals.currUser._id)){
req.flash("error","You don't have permission to delete");
return res.redirect(`/listings/${id}`);
}
next();
}

module.exports.sizeHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // file size error
        if (err.code === "LIMIT_FILE_SIZE") {
            req.flash("error", "Image size is too large! Max 5MB allowed.");
            return res.redirect("back");
        }

        // unexpected field error
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            req.flash("error", "Unexpected file upload error.");
            return res.redirect("back");
        }
    }

    // Cloudinary / other errors
    if (err.message && err.message.includes("File size too large")) {
        req.flash("error", "Image exceeds Cloudinary limit (10MB). Please upload smaller image.");
        return res.redirect(`/listings/${req.params.id}/edit`);
    }

    next(err);
}; 