const db = require('./conn');


class reviewsModel {
    constructor(id, name, distance, stars, category, favorite_dish, does_takeout, last_time_you_ate_there, slug) {
        this.id = id;
        this.name = name;
        this.distance = distance;
        this.stars = stars;
        this.category = category;
        this.favorite_dish = favorite_dish;
        this.does_takeout = does_takeout;
        this.last_time_you_ate_there = last_time_you_ate_there;
        this.slug = slug;
    }
    static async getRestaurants() {
        try{
            const response = await db.any(`SELECT * FROM restaurants;`);
            return response;
        } catch(err) {
            return err
        }
    }
    static async getSingleRestaurant(slug) {
        try {
            const response = await db.one(`SELECT * FROM restaurants WHERE slug = '${slug}';`);
            return response;
        } catch (err) {
            return err
        }
    }
    static async getReviews(slug) {
        try {
            const response = await db.one(`SELECT * FROM restaurants INNER JOIN reviews on restaurants.id = reviews.restaurants_id WHERE slug = '${slug}';`);
            return response;
        } catch(err) {
            return err;
        }
    }
    static async getReviewer(slug) {
        try {
            const response = await db.one(`SELECT
            restaurants.name AS restaurant_name,
            reviewer.name AS reviewer_name,
            reviews.review,
            restaurants.slug
        FROM
            restaurants,
            reviews,
            reviewer
        WHERE
            restaurants.id = reviews.restaurants_id
            AND reviews.reviewer_id = reviewer.id
            AND restaurants.slug = '${slug}';`);
        return response;
        } catch (err) {
            return err
        }
    }
}

module.exports = reviewsModel;