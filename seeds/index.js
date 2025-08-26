/** @format */

const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelper");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
     console.log("Database connected");
});

// Function to get random element from an array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Async function to seed database
const seedDB = async () => {
     // Delete all existing campgrounds
     await Campground.deleteMany({});
     console.log("Deleted all campgrounds");

     // Add 50 new campgrounds
     for (let i = 0; i < 50; i++) {
          const randomCity = sample(cities); // { city, division }
          const descriptor = sample(descriptors);
          const place = sample(places);

          const camp = new Campground({
               title: `${descriptor} ${place}`,
               location: `${randomCity.city}, ${randomCity.division}`,
               // add other fields if necessary (price, images, description)
          });

          await camp.save();
     }
     console.log("Added 50 campgrounds");
};

seedDB().then(() => mongoose.connection.close());
