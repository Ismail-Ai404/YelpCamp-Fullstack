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
               author: "68b9a42fdadc8ca62c0dc4a7",
               title: `${descriptor} ${place}`,
               description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
               location: `${randomCity.city}, ${randomCity.division}`,
               price,
               image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          });

          await camp.save();
     }
     console.log("Added 50 campgrounds");
};

seedDB().then(() => mongoose.connection.close());
