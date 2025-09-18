/** @format */
if (process.env.NODE_ENV !== "production") {
     require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");

const methodOverride = require("method-override");

const session = require("express-session");
const flash = require("connect-flash");

const ExpressError = require("./utils/ExpressError");
// const catchAsync = require("./utils/catchAsync");
const helmet = require("helmet");

const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const authRoutes = require("./routes/auths");
const { Session } = require("inspector/promises");
const MongoStore = require("connect-mongo");

const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// const bodyParser = require("body-parser");

// const mongoSanitize = require("express-mongo-sanitize");
const expressMongoSanitize = require("@exortek/express-mongo-sanitize");

const app = express();

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";
// mongoose.connect(dbURL);
// const dbUrl = ;

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
     console.log("Database connected");
});

// CORS configuration for React frontend
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Vite default port
    credentials: true
}));

app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json()); // parse JSON data
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(methodOverride("_method"));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const secret = process.env.SECRET;
const store = MongoStore.create({
     mongoUrl: dbUrl,
     touchAfter: 24 * 60 * 60,
     crypto: {
          secret,
     },
});

const sessionConfig = {
     store,
     name: "j928hd9wq8h2", // Avoid default name

     secret,
     resave: false,
     saveUninitialized: true,
     cookie: {
          httpOnly: true,
          // secure: true,
          expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // one week
          maxAge: 1000 * 60 * 60 * 24 * 7, // one week
     },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

app.use(flash());

// NEW: Serialize/Deserialize user (fixes the session error)
// These use the built-in methods from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash & isLoggedIn middleware for all views
app.use((req, res, next) => {
     // only store the url if it is not login or register
     if (!["/login", "/", "/register"].includes(req.originalUrl)) {
          req.session.returnTo = req.originalUrl;
     }
     // console.log("session: ", req.session.returnTo);
     // console.log("locals: ", res.locals.returnTo);
     // console.log(`originalUrl: ${req.originalUrl}\n\n\n`);

     res.locals.success = req.flash("success");
     res.locals.error = req.flash("error");
     res.locals.currentUser = req.user;
     next();
});

// Data sanitization against NoSQL query injection
// app.use((req, res, next) => {
//      // Make req.query a plain object if it isn't
//      if (
//           !Object.getOwnPropertyDescriptor(req, "query") ||
//           typeof req.query !== "object"
//      ) {
//           req.query = Object.assign({}, req.query);
//      }
//      next();
// });
// app.use(mongoSanitize());

app.use(expressMongoSanitize());
// Route parameter sanitization (recommended way):
app.param("username", expressMongoSanitize.paramSanitizeHandler());
app.use(helmet());

const scriptSrcUrls = [
     "https://stackpath.bootstrapcdn.com/",
     "https://api.tiles.mapbox.com/",
     "https://api.mapbox.com/",
     "https://kit.fontawesome.com/",
     "https://cdnjs.cloudflare.com/",
     "https://cdn.jsdelivr.net",
     "https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js",
     "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
];
const styleSrcUrls = [
     "https://kit-free.fontawesome.com/",
     "https://stackpath.bootstrapcdn.com/",
     "https://api.mapbox.com/",
     "https://api.tiles.mapbox.com/",
     "https://fonts.googleapis.com/",
     "https://use.fontawesome.com/",
     "https://cdn.jsdelivr.net", // <-- Add this for Bootstrap & Bootstrap Icons
     "https://unpkg.com/", // <-- Add this for Leaflet & MarkerCluster
];
const connectSrcUrls = [
     "https://api.mapbox.com/",
     "https://a.tiles.mapbox.com/",
     "https://b.tiles.mapbox.com/",
     "https://events.mapbox.com/",
];
const fontSrcUrls = [
     "https://fonts.gstatic.com/", // (if you use Google Fonts)
     "https://cdn.jsdelivr.net", // <-- Add this for Bootstrap Icons
];

app.use(
     helmet.contentSecurityPolicy({
          directives: {
               defaultSrc: ["'self'"],
               connectSrc: ["'self'", ...connectSrcUrls],
               scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
               styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
               workerSrc: ["'self'", "blob:"],
               objectSrc: [],
               // Here's the part to update: imgSrc
               imgSrc: [
                    "'self'",
                    "blob:",
                    "data:",
                    "https://res.cloudinary.com/duzj5bpxt/",
                    "https://images.unsplash.com/",
                    "https://a.basemaps.cartocdn.com/", // <-- Allow this
                    "https://b.basemaps.cartocdn.com/", // <-- And this
                    "https://c.basemaps.cartocdn.com/", // <-- And this
                    "https://unpkg.com/", // <-- For Leaflet marker icons
                    "https://*.tile.openstreetmap.org/", // <-- For OSM map tiles
                    "https://a.tile.openstreetmap.org/",
                    "https://b.tile.openstreetmap.org/",
                    "https://c.tile.openstreetmap.org/",
                    // You can also add "https://basemaps.cartocdn.com" if tiles load from that root
               ],
               fontSrc: ["'self'", ...fontSrcUrls],
               // other directives...
          },
     })
);

// API Routes
app.use("/api/auth", authRoutes);

// Campground routes
app.use("/api/campgrounds", campgroundRoutes);

// Review routes
app.use("/api/campgrounds/:id/reviews", reviewRoutes);

// Catch-all handler (404)
app.all(/.*/, (req, res, next) => {
     next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
     console.log(err);
     const { statusCode = 500 } = err;
     if (!err.message) err.message = "Something went wrong! ";
     res.status(statusCode).json({ 
          error: err.message,
          statusCode 
     });
});

const port = process.env.PORT || 3000;

// Server start
app.listen(port, () => {
     console.log(`Serving on port ${port}`);
});
