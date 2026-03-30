const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing =  require("../Models/listing.js");
const { isLoggedIn,isOwner,validateListing,sizeHandler } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


/*app.get("/testListing",async (req,res)=>{
     let sampleListing = new Listing({
        title: "My New Villa",
        description: "By the beach",
        price: 1200,
        location: "Calangute, Goa",
        country: "India",
     });
  
   // await sampleListing.save();
    console.log("sample was saved");
    res.send("succesful testing");
 
});
*/

router.get("/search",wrapAsync(listingcontroller.searchListing)); 

router.get("/suggestions", async (req, res) => {
  const { query } = req.query;

  if (!query) return res.json([]);

  const results = await Listing.aggregate([
    {
      $match: {
        location: { $regex: query, $options: "i" }
      }
    },
    {
      $group: {
        _id: "$location"
      }
    },
    { $limit: 5 }
  ]);

  const suggestions = results.map(item => item._id);

  res.json(suggestions);
});

//new listing route
router.get("/new",isLoggedIn,listingcontroller.renderAddNewListingForm);

router.get("/category",wrapAsync(listingcontroller.index));

//router.route is used when request is coming on same path means when path is calling by multiple routes then router.route is used
router.route("/")
      .get(wrapAsync(listingcontroller.index)) // index route  //index is a callback for fn which is exported by ../controllers/listings.js and is written also inside listings.js
      .post(
         isLoggedIn,
         upload.single('image'),
         sizeHandler,
         validateListing, 
         wrapAsync(listingcontroller.postAddNewListingRequest)
      ); //create add list on listing route
      



//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingcontroller.renderEditListingForm));


router.route("/:id")
      .put(isLoggedIn,isOwner,upload.single('image'),sizeHandler,validateListing,wrapAsync(listingcontroller.putEditListingRequest ))//update data route
      .delete(isLoggedIn,isOwner, wrapAsync(listingcontroller.destroyListingRequest))//delete list route
      .get(wrapAsync(listingcontroller.showListingRequest));//show route



module.exports = router;