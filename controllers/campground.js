/** @format */

const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const { cloudinary } = require("../database/cloudinary");
const { geocoding, config } = require("@maptiler/client");

// require("dotenv").config(); // ensure .env loaded if not already

const maptilerApiKey = process.env.MAPTILER_API_KEY;
if (!maptilerApiKey) {
     throw new Error("MAPTILER_API_KEY is not defined in .env");
}

config.apiKey = maptilerApiKey;

module.exports.index = async (req, res) => {
     const campgrounds = await Campground.find({});
     res.render("campground/index", { campgrounds });
     if (!campgrounds) {
          // console.error(err);
          req.flash("error", "Error fetching campgrounds.");
          res.redirect("/");
     }
};

module.exports.renderNewForm = (req, res) => {
     res.render("campground/new");
};

module.exports.createCampground = catchAsync(async (req, res) => {
     const { title, location, description, price } = req.body;
     console.log("req.files:", req.files); // 👈 Debug check

     let geoData;
     try {
          const geoResponse = await geocoding.forward(location, { limit: 1 });
          if (
               !geoResponse ||
               !geoResponse.features ||
               geoResponse.features.length === 0
          ) {
               throw new Error("No geocoding result for location: " + location);
          }
          const feature = geoResponse.features[0];
          // coordinates are [lon, lat]
          const [lon, lat] = feature.geometry.coordinates;
          geoData = {
               type: "Point",
               coordinates: [lon, lat],
          };
          console.log("Geocoded data:", geoData); // 👈 Debug check
     } catch (err) {
          console.error("Error during geocoding:", err);
          req.flash("error", "Invalid location. Could not geocode.");
          return res.redirect("/campgrounds/new");
     }

     const campground = new Campground({
          title,
          location,
          description,
          price,
          geometry: geoData, // new field
          images: req.files.map((f) => ({ url: f.path, filename: f.filename })),
          author: req.user._id,
     });

     // if (!title || !location) {
     //      throw new ExpressError("Invalid Camground Input", 400);
     // }
     if (!campground) {
          // console.error(err);
          req.flash("error", "Failed to create campground.");
          res.redirect("/campgrounds");
     }
     // console.log(campground);

     await campground.save();
     req.flash("success", "Campground created successfully!");
     res.redirect(`/campgrounds/${campground._id}`);
});

module.exports.showCampground = catchAsync(async (req, res) => {
     const { id } = req.params;

     const campground = await Campground.findById(id)
          .populate({ path: "reviews", populate: { path: "author" } })
          .populate("author");

     if (!campground) {
          // console.error(err);
          req.flash("error", "Campground not found.");
          // throw new ExpressError("Campground not found", 404);
          return res.redirect("/campgrounds");
     }
     // console.log(campground);
     res.render("campground/show", { campground });
});

module.exports.renderEditForm = catchAsync(async (req, res) => {
     const { id } = req.params;
     const campground = await Campground.findById(id);
     if (!campground) {
          req.flash("error", "Campground not found.");
          return res.redirect("/campgrounds");
     }

     res.render("campground/edit", { campground });
});

module.exports.updateCampground = catchAsync(async (req, res) => {
     const { id } = req.params;
     const { title, location, description, price, images } = req.body;

     const campground = await Campground.findByIdAndUpdate(
          id,
          { title, location, description, price },
          { new: true }
     );

     if (!campground) {
          // console.error(err);
          req.flash("error", "Error updating campground.");
          res.redirect("/campgrounds");
     }

     const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
     await campground.images.push(...imgs);
     if (req.body.deleteImages) {
          // Delete images from Cloudinary
          for (let filename of req.body.deleteImages) {
               await cloudinary.uploader.destroy(filename);
          }
          await campground.updateOne({
               $pull: { images: { filename: { $in: req.body.deleteImages } } },
          });
     }
     await campground.save();

     req.flash("success", "Campground updated successfully!");
     res.redirect(`/campgrounds/${campground._id}`);
});

module.exports.deleteCampground = catchAsync(async (req, res) => {
     // This one command will now trigger the middleware

     const { id } = req.params;
     const campground = await Campground.findById(id);
     if (!campground) {
          req.flash("error", "Campground not found.");
          return res.redirect("/campgrounds");
     }

     await Campground.findByIdAndDelete(req.params.id);
     req.flash(
          "success",
          "Campground and all its reviews deleted successfully!"
     );
     res.redirect("/campgrounds");
});
