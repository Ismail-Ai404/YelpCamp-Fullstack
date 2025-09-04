/** @format */

const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const { campgroundSchema } = require("../middleware/joiSchemas");
const { isLoggedIn } = require("../middleware/login");

function validateCampground(req, res, next) {
     const { error } = campgroundSchema.validate(req.body);
     if (error) {
          const msg = error.details.map((d) => d.message).join(", ");
          // req.flash("error", msg);
          throw new ExpressError(msg, 400);
     } else next();
}

// Index route - show all campgrounds
router.get("/", async (req, res) => {
     const campgrounds = await Campground.find({});
     res.render("campground/index", { campgrounds });
     if (!campgrounds) {
          // console.error(err);
          req.flash("error", "Error fetching campgrounds.");
          res.redirect("/");
     }
});

// New campground form
router.get("/new", isLoggedIn, (req, res) => {
     res.render("campground/new");
});

// Create campground
router.post(
     "/",
     isLoggedIn,
     validateCampground,
     catchAsync(async (req, res) => {
          const { title, location, description, price, image } = req.body;
          // try {
          const campground = new Campground({
               title,
               location,
               description,
               price,
               image,
          });
          // if (!title || !location) {
          //      throw new ExpressError("Invalid Camground Input", 400);
          // }
          if (!campground) {
               // console.error(err);
               req.flash("error", "Failed to create campground.");
               res.redirect("/campgrounds");
          }
          await campground.save();
          req.flash("success", "Campground created successfully!");
          res.redirect(`/campgrounds/${campground._id}`);
     })
);

// Show single campground
router.get(
     "/:id",
     catchAsync(async (req, res) => {
          const { id } = req.params;

          const campground = await Campground.findById(id).populate("reviews");
          if (!campground) {
               // console.error(err);
               req.flash("error", "Campground not found.");
               // throw new ExpressError("Campground not found", 404);
               return res.redirect("/campgrounds");
          }
          res.render("campground/show", { campground });
     })
);

// Edit campground form
router.get(
     "/:id/edit",
     isLoggedIn,

     catchAsync(async (req, res) => {
          const { id } = req.params;
          const campground = await Campground.findById(id);
          if (!campground) {
               req.flash("error", "Campground not found.");
               return res.redirect("/campgrounds");
          }
          res.render("campground/edit", { campground });
     })
);

// Update campground
router.put(
     "/:id",
     isLoggedIn,
     validateCampground,
     catchAsync(async (req, res) => {
          const { id } = req.params;
          const { title, location, description, price, image } = req.body;

          const campground = await Campground.findByIdAndUpdate(
               id,
               { title, location, description, price, image },
               { new: true }
          );
          if (!campground) {
               // console.error(err);
               req.flash("error", "Error updating campground.");
               res.redirect("/campgrounds");
          }
          req.flash("success", "Campground updated successfully!");
          res.redirect(`/campgrounds/${campground._id}`);
     })
);

//Express route for deleting a campground
router.delete(
     "/:id",
     isLoggedIn,
     catchAsync(async (req, res) => {
          // This one command will now trigger the middleware
          await Campground.findByIdAndDelete(req.params.id);
          req.flash(
               "success",
               "Campground and all its reviews deleted successfully!"
          );
          res.redirect("/campgrounds");
     })
);

module.exports = router;
