const express = require('express');
const router = express.Router();
const reviewsModel = require('../models/reviews');

const renderPage = async res => {
    const reviewsData = await reviewsModel.getRestaurants();
    console.log(reviewsData);
    res.render('template', {
        locals: {
            title: 'Yelp Clone',
            reviewsData: reviewsData,
        },
        partials: {
            partial: 'partial-index'
        }
    })
}


router.get('/', async (req,res) => {
    renderPage(res);
})





module.exports = router;