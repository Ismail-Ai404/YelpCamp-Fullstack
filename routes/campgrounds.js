/** @format */

const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");

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
     try {
          const campgrounds = await Campground.find({});
          res.render("campground/index", { campgrounds });
     } catch (err) {
          console.error(err);
          req.flash("error", "Error fetching campgrounds.");
          res.redirect("/");
     }
});

// New campground form
router.get("/new", (req, res) => {
     res.render("campground/new");
});

// Create campground
router.post(
     "/",
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
          await campground.save();
          req.flash("success", "Campground created successfully!");
          res.redirect(`/campgrounds/${campground._id}`);
          // } catch (err) {
          //      console.error(err);
          //      req.flash("error", "Failed to create campground.");
          //      res.redirect("/campgrounds");
          // }
     })
);

// Show single campground
router.get(
     "/:id",
     catchAsync(async (req, res) => {
          const { id } = req.params;
          try {
               const campground = await Campground.findById(id).populate(
                    "reviews"
               );
               if (!campground) {
                    req.flash("error", "Campground not found.");
                    // throw new ExpressError("Campground not found", 404);
                    return res.redirect("/campgrounds");
               }
               res.render("campground/show", { campground });
          } catch (err) {
               console.error(err);
               req.flash("error", "Error fetching campground.");
               res.redirect("/campgrounds");
          }
     })
);

// Edit campground form
router.get(
     "/:id/edit",

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
     validateCampground,
     catchAsync(async (req, res) => {
          const { id } = req.params;
          const { title, location, description, price, image } = req.body;
          try {
               const campground = await Campground.findByIdAndUpdate(
                    id,
                    { title, location, description, price, image },
                    { new: true }
               );
               req.flash("success", "Campground updated successfully!");
               res.redirect(`/campgrounds/${campground._id}`);
          } catch (err) {
               console.error(err);
               req.flash("error", "Error updating campground.");
               res.redirect("/campgrounds");
          }
     })
);

//Express route for deleting a campground
router.delete(
     "/:id",
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
