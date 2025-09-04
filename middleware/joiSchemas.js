/** @format */

const Joy = require("joi");

module.exports.campgroundSchema = Joy.object({
     title: Joy.string().required(),
     image: Joy.string().required(),
     description: Joy.string().required(),
     location: Joy.string().required(),
     price: Joy.number().required().min(0),
});

module.exports.reviewSchema = Joy.object({
     review: Joy.object({
          rating: Joy.number().required().min(1).max(5),
          body: Joy.string().max(1000).allow(""),
     }).required(),
});
