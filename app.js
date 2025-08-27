/** @format */

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const app = express();

app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(methodOverride("_method")); // looks for ?_method=PUT in form action

app.set("view engine", "ejs");
app.engine("ejs", ejsMate); // use ejs-mate for layouts

app.set("views", path.join(__dirname, "views"));

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
     console.log("Database connected");
});

app.get("/", (req, res) => {
     res.send("jj");
});

// Route to show all campgrounds
app.get("/campgrounds", async (req, res) => {
     try {
          const campgrounds = await Campground.find({});
          res.render("campground/index", { campgrounds });
     } catch (err) {
          console.error(err);
          res.send("Error fetching campgrounds");
     }
});

// Form to create a new campground
app.get("/campgrounds/new", (req, res) => {
     res.render("campground/new");
});

// Create a new campground
app.post("/campgrounds", async (req, res) => {
     const { title, location, description, price } = req.body;
     const campground = new Campground({
          title,
          location,
          description,
          price,
          image,
     });
     await campground.save();
     res.redirect(`/campgrounds/${campground._id}`); // go to the new campground page
});

// Show route for a single campground
app.get("/campgrounds/:id", async (req, res) => {
     const { id } = req.params;
     try {
          const campground = await Campground.findById(id);
          if (!campground) {
               return res.send("Campground not found");
          }
          res.render("campground/show", { campground });
     } catch (err) {
          console.error(err);
          res.send("Error fetching campground");
     }
});

// Show form to edit campground
app.get("/campgrounds/:id/edit", async (req, res) => {
     const { id } = req.params;
     const campground = await Campground.findById(id);
     if (!campground) return res.send("Campground not found");
     res.render("campground/edit", { campground });
});

// Update campground
app.put("/campgrounds/:id", async (req, res) => {
     const { id } = req.params;
     const { title, location, description, price } = req.body;
     try {
          const campground = await Campground.findByIdAndUpdate(
               id,
               { title, location, description, price },
               { new: true }
          );
          res.redirect(`/campgrounds/${campground._id}`);
     } catch (err) {
          console.error(err);
          res.send("Error updating campground");
     }
});
// Delete campground
app.delete("/campgrounds/:id", async (req, res) => {
     const { id } = req.params;
     try {
          await Campground.findByIdAndDelete(id);
          res.redirect("/campgrounds"); // go back to all campgrounds
     } catch (err) {
          console.error(err);
          res.send("Error deleting campground");
     }
});

app.listen(3000, () => {
     console.log("Serving on port 3000");
});
