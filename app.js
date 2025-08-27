/** @format */

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
     console.log("Database connected");
});

// View engine setup
app.engine("ejs", ejsMate); // layouts support
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(methodOverride("_method"));

app.use(
     session({
          secret: "thisshouldbeabettersecret!",
          resave: false,
          saveUninitialized: true,
     })
);
app.use(flash());

// Flash middleware for all views
app.use((req, res, next) => {
     res.locals.success = req.flash("success");
     res.locals.error = req.flash("error");
     next();
});

// Root route
app.get("/", (req, res) => {
     res.send("Welcome to YelpCamp!");
});

// Index route - show all campgrounds
app.get("/campgrounds", async (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
     res.render("campground/new");
});

// Create campground
app.post("/campgrounds", async (req, res) => {
     const { title, location, description, price, image } = req.body;
     try {
          const campground = new Campground({
               title,
               location,
               description,
               price,
               image,
          });
          await campground.save();
          req.flash("success", "Campground created successfully!");
          res.redirect(`/campgrounds/${campground._id}`);
     } catch (err) {
          console.error(err);
          req.flash("error", "Failed to create campground.");
          res.redirect("/campgrounds");
     }
});

// Show single campground
app.get("/campgrounds/:id", async (req, res) => {
     const { id } = req.params;
     try {
          const campground = await Campground.findById(id);
          if (!campground) {
               req.flash("error", "Campground not found.");
               return res.redirect("/campgrounds");
          }
          res.render("campground/show", { campground });
     } catch (err) {
          console.error(err);
          req.flash("error", "Error fetching campground.");
          res.redirect("/campgrounds");
     }
});

// Edit campground form
app.get("/campgrounds/:id/edit", async (req, res) => {
     const { id } = req.params;
     const campground = await Campground.findById(id);
     if (!campground) {
          req.flash("error", "Campground not found.");
          return res.redirect("/campgrounds");
     }
     res.render("campground/edit", { campground });
});

// Update campground
app.put("/campgrounds/:id", async (req, res) => {
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
});

// Delete campground
app.delete("/campgrounds/:id", async (req, res) => {
     const { id } = req.params;
     try {
          await Campground.findByIdAndDelete(id);
          req.flash("success", "Campground deleted successfully!");
          res.redirect("/campgrounds");
     } catch (err) {
          console.error(err);
          req.flash("error", "Error deleting campground.");
          res.redirect("/campgrounds");
     }
});

// Server start
app.listen(3000, () => {
     console.log("Serving on port 3000");
});
