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

module.exports.index = catchAsync(async (req, res) => {
     const campgrounds = await Campground.find({}).populate('author', 'username');
     res.json({
          success: true,
          campgrounds
     });
});

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
     } catch (err) {
          console.error("Error during geocoding:", err);
          return res.status(400).json({
               success: false,
               message: "Invalid location. Could not geocode."
          });
     }

     const campground = new Campground({
          title,
          location,
          description,
          price,
          geometry: geoData,
          images: req.files ? req.files.map((f) => ({ url: f.path, filename: f.filename })) : [],
          author: req.user._id,
     });

     await campground.save();
     
     const populatedCampground = await Campground.findById(campground._id).populate('author', 'username');
     
     res.status(201).json({
          success: true,
          message: "Campground created successfully!",
          campground: populatedCampground
     });
});

module.exports.showCampground = catchAsync(async (req, res) => {
     const { id } = req.params;

     const campground = await Campground.findById(id)
          .populate({ path: "reviews", populate: { path: "author" } })
          .populate("author");

     if (!campground) {
          return res.status(404).json({
               success: false,
               message: "Campground not found."
          });
     }
     
     res.json({
          success: true,
          campground
     });
});

module.exports.updateCampground = catchAsync(async (req, res) => {
     const { id } = req.params;
     const { title, location, description, price } = req.body;

     const campground = await Campground.findByIdAndUpdate(
          id,
          { title, location, description, price },
          { new: true }
     ).populate('author', 'username');

     if (!campground) {
          return res.status(404).json({
               success: false,
               message: "Campground not found."
          });
     }

     if (req.files && req.files.length > 0) {
          const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
          campground.images.push(...imgs);
     }
     
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

     res.json({
          success: true,
          message: "Campground updated successfully!",
          campground
     });
});

module.exports.deleteCampground = catchAsync(async (req, res) => {
     const { id } = req.params;
     const campground = await Campground.findById(id);
     
     if (!campground) {
          return res.status(404).json({
               success: false,
               message: "Campground not found."
          });
     }

     await Campground.findByIdAndDelete(id);
     
     res.json({
          success: true,
          message: "Campground and all its reviews deleted successfully!"
     });
});
