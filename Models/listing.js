const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  
  location: String,
  country: String,

  image: {
    url: String,
    filename: String,
  },

  category: {
    type: String,
    enum: [
      "Trending",
      "Rooms",
      "IconicCities",
      "Mountains",
      "Castles",
      "AmazingPools",
      "Camping",
      "Farms",
      "Arctic"
    ],
    required: true
  },

  reviews:[ {
    type: Schema.Types.ObjectId,
    ref: "Review",
  }],
  owner: {
  type: Schema.Types.ObjectId,
  ref: "User",
},

geometry: {
  type: {
  type: String,
  enum: ["Point"],
  required: true
},
coordinates: {
  type: [Number],
  required: true
}}
});

module.exports =mongoose.model("Listing", listingSchema); 