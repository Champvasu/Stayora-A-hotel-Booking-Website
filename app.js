if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const methodOverride = require("method-override");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user.js");
const multer = require('multer');

const port = 3000;

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const altlasDbUrl = process.env.ATLASDB_URL;


main().then(() => {
  console.log("connected to db");
}).catch((err) => console.log(err));

/*async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Stayora');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
} This is mongodb connectivity url used to connect mongodb to our project on local system means used to store data abd create databse on our local system, we sotre retieve ansd do work related to our databases work in our system*/

async function main() {
  await mongoose.connect(altlasDbUrl);

} 

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Parse URL-encoded bodies with limit
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


const store = MongoStore.create({
  mongoUrl: altlasDbUrl,
  crypto: {
     secret: process.env.SECRET,
  },
  touchAfter: 24*3600,

});

store.on("error", ()=>{
  console.log("ERROR in MONGO SESSION");
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,// value must be passed in milliseconds this cookie expires after 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};




app.use(session(sessionOptions));
app.use(flash());//declared before routes because it is used with the help of routes like /lisitngs
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})


  
//router
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

//universal error if page doesn't exist
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

//middleware
app.use((err,req,res,next)=>{
    let {statusCode = 500, message="Something went wrong!"} = err;
    if (statusCode !== 404) {
        console.log("ERROR CAUGHT BY MIDDLEWARE:", err.message);
        console.log("Full error:", err);
    }
    res.status(statusCode).render("error.ejs",{statusCode,message});
});

app.listen(port, () => {
  console.log("Server start listening");
});