/** @format */

const express = require("express");
const router = express.Router();

const ctlCamps = require("../controllers/campground");

const { isLoggedIn } = require("../middlewares/isLoggedIn");
const isAuthor = require("../middlewares/isAuthor");
const { validateCampground } = require("../middlewares/schemaValidation");

// Index route - show all campgrounds
router.get("/", ctlCamps.index);

// New campground form
router.get("/new", isLoggedIn, ctlCamps.renderNewForm);

// Create campground
router.post("/", isLoggedIn, validateCampground, ctlCamps.createCampground);

// Show single campground
router.get("/:id", ctlCamps.showCampground);

// Edit campground form
router.get("/:id/edit", isLoggedIn, isAuthor, ctlCamps.renderEditForm);

// Update campground
router.put(
     "/:id",
     isLoggedIn,
     isAuthor,
     validateCampground,
     ctlCamps.updateCampground
);

//Express route for deleting a campground
router.delete("/:id", isLoggedIn, isAuthor, ctlCamps.deleteCampground);

module.exports = router;
