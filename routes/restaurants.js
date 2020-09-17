const express = require('express');
const router = express.Router();
const reviewsModel = require('../models/reviews');

router.get('/:name?', async (req,res) => {
    console.log(req.params);
    if (req.params.name === undefined) {
        res.redirect('/')
    } else {
        const restaurantData = await reviewsModel.getSingleRestaurant(req.params.name);
        console.log(restaurantData);
        res.render('template', {
            locals: {
                title: 'Yelp Clone',
                restaurantData: restaurantData
            },
            partials: {
                partial: 'restaurants-page'
            }
        })
    }
  
})

module.exports = router;