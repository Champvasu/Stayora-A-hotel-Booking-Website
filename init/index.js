const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

main().then(()=>{
      console.log("connected to db");
      }).catch(( err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Stayora');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDb = async () =>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({...obj,owner: "69b68c4e83db017949e67979"}));
   console.log(initData.data);
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
}

initDb();