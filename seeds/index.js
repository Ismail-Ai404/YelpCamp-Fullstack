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

     function roundToTwoDecimalPlaces(num) {
          return Math.round(num * 100) / 100;
     }
     // Add 50 new campgrounds
     for (let i = 0; i < 50; i++) {
          const randomCity = sample(cities); // { city, division }
          const descriptor = sample(descriptors);
          const place = sample(places);
          const price = roundToTwoDecimalPlaces(Math.random() * 20 + 10);

          const camp = new Campground({
               title: `${descriptor} ${place}`,
               location: `${randomCity.city}, ${randomCity.division}`,
               price,
               image: "https://images.unsplash.com/photo-1641871205153-1401cab015c9?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          });

          await camp.save();
     }
     console.log("Added 50 campgrounds");
};

seedDB().then(() => mongoose.connection.close());
