/** @format */

const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");

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

     // try {
     const campground = new Campground({
          title,
          location,
          description,
          price,
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
     console.log(campground);

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
