const Listing = require("../Models/listing");
const upload = require("../utils/multer");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});


module.exports.searchListing = async (req, res) => {
    console.log("Search Route hit");
  const { query } = req.query;

  if (!query) {
    return res.redirect("/listings");  // ✅ redirect, not render
  }

  const listings = await Listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } }
    ]
  });
 console.log(listings);
  res.render("listings/index.ejs", { allListings: listings }); // ✅ correct
};

module.exports.index = async (req, res) => {
  const { category } = req.query;

  let allListings;

  if(category){
    allListings = await Listing.find({ category });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", { allListings, category });
};


module.exports.renderAddNewListingForm = (req,res)=>{

   res.render("listings/new.ejs");
};

module.exports.postAddNewListingRequest = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
    })
    .send();;

    try {
        let newListing = new Listing(req.body.listing);

        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        newListing.owner = req.user._id;
        newListing.geometry = response.body.features[0].geometry;

        let savedListing=  await newListing.save();
        console.log(savedListing);

        console.log("Listing saved successfully!");

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch(err) {
        console.log("error", err.message);
        next(err);
    }
};

module.exports.renderEditListingForm = async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);

     if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload","/upload/h_300,w_250");
  res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.putEditListingRequest = async (req,res)=>{
let {id} = req.params;
let modifiedData = req.body.listing;
let listing = await Listing.findByIdAndUpdate(id, modifiedData, {new: true});
if(req.file ){
    listing.image= {
        url: req.file.path,
        filename: req.file.filename
    };
 await listing.save();
}
req.flash("success", "Listing Updated!");
res.redirect(`/listings/${id}`);

};

module.exports.destroyListingRequest = async (req,res) =>{
    let {id}= req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};

module.exports.showListingRequest = async (req,res)=>{
    let {id} = req.params;
    //const listing = await Listing.findById(id);

    const listing = await Listing.findById(id).populate({path:"reviews",populate: {path: "author",},}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

