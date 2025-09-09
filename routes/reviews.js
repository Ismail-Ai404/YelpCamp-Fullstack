/** @format */

const express = require("express");
const router = express.Router({ mergeParams: true });

const isReviewAuthor = require("../middlewares/isReviewAuthor");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const { validateReview } = require("../middlewares/schemaValidation");

const ctlReviews = require("../controllers/review");

// Create review
router.post("", isLoggedIn, validateReview, ctlReviews.createReview);

// Delete Review
router.delete(
     "/:reviewId",
     isLoggedIn,
     isReviewAuthor,
     ctlReviews.deleteReview
);

module.exports = router;
