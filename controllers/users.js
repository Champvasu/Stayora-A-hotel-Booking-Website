const User = require("../Models/user");

module.exports.renderSignupFormRequest = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.postSignupRequest = async(req,res)=>{
    try{
    let {username,email,password} = req.body;
    let newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);

    req.login(registeredUser,(err)=>{
     if(err){
        return next(err);
     }
      req.flash("success","Welcome to Stayora");
      res.redirect("/listings");
    });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginFormRequest = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.postLoginFormRequest = async(req,res)=>{
     req.flash("success","Welcome to Stayora! You are logged in!");
     let redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect("/listings");
};

module.exports.logoutRequest = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
};