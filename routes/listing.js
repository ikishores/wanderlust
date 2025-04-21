const express=require('express');
const router=express.Router();
const listing=require('../models/listing.js');
const {isLoggedin,isOwner}=require('../middleware.js')
const listingcontrooler=require('../controllers/listing.js');
const multer  = require('multer')
const {storage}=require('../cloudconfig.js')
const upload = multer({ storage });


router.route('/')
.get(listingcontrooler.index)
 .post( isLoggedin,upload.single('listing[image]'),listingcontrooler.newRoute); 


    
     

//new route
     router.get('/new',isLoggedin,async(req,res)=>{
       
        res.render('listings/new.ejs');
    })


//show route

router.route('/:id')
.get(isLoggedin,listingcontrooler.renderNewForm)
.put(isLoggedin,isOwner,upload.single('listing[image]'),listingcontrooler.editform)
.delete(isLoggedin, listingcontrooler.deleteform);

    // router.get('/:id',isLoggedin,listingcontrooler.renderNewForm);

    //NEW ROUTE
    


    //edit rout
    router.get('/:id/edit',isLoggedin, listingcontrooler.getForm);
    

    //update route
    // router.put('/:id',isLoggedin,isOwner,listingcontrooler.editform);
    


   // DELETE ROUTE
// router.delete('/:id',isLoggedin, listingcontrooler.deleteform);


module.exports=router;
