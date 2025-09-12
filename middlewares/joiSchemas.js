/** @format */

const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
     type: "string",
     base: joi.string(),
     messages: {
          "string.escapeHTML": "{{#label}} must not include HTML!",
     },
     rules: {
          escapeHTML: {
               validate(value, helpers) {
                    const clean = sanitizeHtml(value, {
                         allowedTags: [],
                         allowedAttributes: {},
                    });
                    if (clean !== value)
                         return helpers.error("string.escapeHTML", { value });
                    return clean;
               },
          },
     },
});

const Joy = BaseJoi.extend(extension);

module.exports.campgroundSchema = Joy.object({
     title: Joy.string().required().escapeHTML(),
     // image: Joy.string().required(),
     description: Joy.string().required().escapeHTML(),
     location: Joy.string().required().escapeHTML(),
     price: Joy.number().required().min(0),
     deleteImages: Joy.array(),
});

module.exports.reviewSchema = Joy.object({
     review: Joy.object({
          rating: Joy.number().required().min(1).max(5),
          body: Joy.string().max(1000).allow("").escapeHTML(),
     }).required(),
});

module.exports.userSchema = Joy.object({
     username: Joy.string().alphanum().min(3).max(30).required().escapeHTML(),
     email: Joy.string().email().required().escapeHTML(),
     password: Joy.string().required().min(8).max(128),
});
