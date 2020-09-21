const express = require('express');
const router = express.Router();
const reviewsModel = require('../models/reviews');

router.get('/:name?', async (req,res) => {
    console.log(req.params);
    if (req.params.name === undefined) {
        res.redirect('/')
    } else {
        const restaurantData = await reviewsModel.getSingleRestaurant(req.params.name);
        const reviewData = await reviewsModel.getReviews(req.params.name);
        const reviewerData = await reviewsModel.getReviewer(req.params.name)
        console.log(restaurantData);
        console.log(reviewData);
        console.log(reviewerData);
        res.render('template', {
            locals: {
                title: 'Yelp Clone',
                restaurantData: restaurantData,
                reviewData: reviewData,
                reviewerData: reviewerData
            },
            partials: {
                partial: 'restaurants-page'
            }
        })
    }
  
})

module.exports = router;