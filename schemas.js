/** @format */

const Joy = require("joi");

module.exports.campgroundSchema = Joy.object({
     title: Joy.string().required(),
     image: Joy.string().required(),
     description: Joy.string().required(),
     location: Joy.string().required(),
     price: Joy.number().required().min(0),
});
