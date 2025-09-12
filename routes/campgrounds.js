/** @format */

const express = require("express");
const router = express.Router();

const ctlCamps = require("../controllers/campground");

const { isLoggedIn } = require("../middlewares/isLoggedIn");
const isAuthor = require("../middlewares/isAuthor");
const { validateCampground } = require("../middlewares/schemaValidation");

const multer = require("multer");
const { storage } = require("../database/cloudinary");
const upload = multer({ storage });

// If you want to store files locally instead of cloudinary, use this line instead:
//const upload = multer({ dest: "uploads/" });
// 'upload' is a middleware that will parse multipart/form-data requests and add a 'file' or 'files' property to the request object.
// In the route handler, you can access the uploaded file(s) via 'req.file' or 'req.files'.

// Multer middleware to handle multiple file uploads with the field name 'images'
// You can adjust the number based on your requirements

router
     .route("/")
     .get(ctlCamps.index)
     .post(
          isLoggedIn,
          upload.array("image"),
          validateCampground,
          ctlCamps.createCampground
     );

router.get("/new", isLoggedIn, ctlCamps.renderNewForm);

router
     .route("/:id")
     .get(ctlCamps.showCampground)
     .put(
          isLoggedIn,
          isAuthor,
          upload.array("image"),
          validateCampground,
          ctlCamps.updateCampground
     )
     .delete(isLoggedIn, isAuthor, ctlCamps.deleteCampground);

router.get("/:id/edit", isLoggedIn, isAuthor, ctlCamps.renderEditForm);

module.exports = router;
