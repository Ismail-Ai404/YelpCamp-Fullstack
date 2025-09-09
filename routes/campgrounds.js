/** @format */

const express = require("express");
const router = express.Router();

const ctlCamps = require("../controllers/campground");

const { isLoggedIn } = require("../middlewares/isLoggedIn");
const isAuthor = require("../middlewares/isAuthor");
const { validateCampground } = require("../middlewares/schemaValidation");

router
     .route("/")
     .get(ctlCamps.index)
     .post(isLoggedIn, validateCampground, ctlCamps.createCampground);

router.get("/new", isLoggedIn, ctlCamps.renderNewForm);

router
     .route("/:id")
     .get(ctlCamps.showCampground)
     .put(isLoggedIn, isAuthor, validateCampground, ctlCamps.updateCampground)
     .delete(isLoggedIn, isAuthor, ctlCamps.deleteCampground);

router.get("/:id/edit", isLoggedIn, isAuthor, ctlCamps.renderEditForm);

module.exports = router;
