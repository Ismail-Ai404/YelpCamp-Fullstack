/** @format */

const express = require("express");

const path = require("path");

const mongoose = require("mongoose");

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const flash = require("connect-flash");

const ExpressError = require("./utils/ExpressError");
// const catchAsync = require("./utils/catchAsync");

const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const { Session } = require("inspector/promises");

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
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(methodOverride("_method"));

const sessionConfig = {
     secret: "thisshouldbeabettersecret!",
     resave: false,
     saveUninitialized: true,
     cookie: {
          httpOnly: true,
          expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // one week
          maxAge: 1000 * 60 * 60 * 24 * 7, // one week
     },
};

app.use(session(sessionConfig));

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

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

// Catch-all handler (404)
app.all(/.*/, (req, res, next) => {
     next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
     console.log(err);
     const { statusCode = 500 } = err;
     if (!err.message) err.message = "Something went wrong! ";
     res.status(statusCode).render("error", { err });
});

// Server start
app.listen(3000, () => {
     console.log("Serving on port 3000");
});
