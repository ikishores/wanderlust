if(process.env.NODE_ENV!="production"){

    require('dotenv').config();
}

//console.log(process.env.SECRET);





const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require('./models/listing.js');
const Review=require('./models/reviews.js');
const session=require('express-session');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const Localstratergy=require('passport-local');
const User=require('./models/user.js');
const chatRoutes = require('./routes/chat');



const klistings=require('./routes/listing.js');
const kreviews=require('./routes/review.js');
const kusers=require('./routes/user.js');







const path=require('path');
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');



const dburl=process.env.ATLASDB_URL;
main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dburl);
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,'/public')));

app.use(express.json()); // for parsing application/json
app.use(chatRoutes);

const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600
});
store.on('error',()=>{
    console.log('Error in store',err);
})

const sessionOption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};



app.use(session(sessionOption));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());//store
passport.deserializeUser(User.deserializeUser());//Unstore


app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error = req.flash('error'); 
    res.locals.currentUser = req.user;
    next();
})


app.get('/demo',async(req,res)=>{
    let fakeUser=new User({
        email:"student@gmail.com",
        username:"student"
    });
   let registerUser=await User.register(fakeUser,"helloword");
   res.send(registerUser);
})

app.use('/listings',klistings)
//reviews
app.use('/listings/:id/reviews',kreviews)
//post route

app.use('/',kusers);


// app.get('/testListing',async (req,res)=>{
//     let samplelisting=new listing({
//         title:"My Home",
//         description:"Please buy the land",
//         price:1200,
//         location:"Banglore",
//         country:"India"
//     });
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("succesful testing");
// });

// app.use((err,req,res,next)=>{
// res.send("something went wrong");
// })

app.use((err, req, res, next) => {
    console.log("💥 ERROR:", err.message);
    req.flash('error', err.message);
    res.redirect('/listings');
});



app.listen(8000,(req,res)=>{
    console.log("server is running on port 8000");
});
