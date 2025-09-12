/** @format */
const ExpressError = require("../utils/ExpressError");
const { campgroundSchema } = require("./joiSchemas");
const { reviewSchema } = require("./joiSchemas");
const { userSchema } = require("./joiSchemas");

module.exports.validateCampground = (req, res, next) => {
     const { error } = campgroundSchema.validate(req.body);
     if (error) {
          const msg = error.details.map((d) => d.message).join(", ");
          // req.flash("error", msg);
          throw new ExpressError(msg, 400);
     } else next();
};

// Validation middleware for reviews
function validateReview(req, res, next) {
     const { error } = reviewSchema.validate(req.body);
     if (error) {
          const msg = error.details.map((d) => d.message).join(", ");
          // req.flash("error", msg);
          throw new ExpressError(msg, 400);
     } else next();
}
function validateUser(req, res, next) {
     const { error } = userSchema.validate(req.body);
     if (error) {
          const msg = error.details.map((d) => d.message).join(", ");
          // req.flash("error", msg);
          throw new ExpressError(msg, 400);
     } else next();
}

module.exports.validateReview = validateReview;
module.exports.validateUser = validateUser;
