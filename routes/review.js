const express = require('express');
const router = express.Router({ mergeParams: true }); // This is key
const listing = require('../models/listing');
const Review = require('../models/reviews');
const KReview=require('../controllers/reviews.js');

router.post('/', KReview.isReview);

module.exports = router;
