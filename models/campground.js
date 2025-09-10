/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Review = require("./review");

const { cloudinary } = require("../database/cloudinary");

const ImageSchema = new Schema({
     url: String,
     filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
     return this.url.replace("/upload", "/upload/w_200,h_150,c_fill");
});

const CampgroundSchema = new Schema({
     title: String,
     price: Number,
     description: String,
     location: String,
     images: [ImageSchema],

     author: {
          type: Schema.Types.ObjectId,
          ref: "User",
     },
     reviews: [
          {
               type: Schema.Types.ObjectId,
               ref: "Review",
          },
     ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
     // The hook receives the deleted document as `doc`
     if (doc) {
          await Review.deleteMany({
               _id: {
                    $in: doc.reviews, // Delete all reviews whose IDs are in the deleted campground's reviews array
               },
          });
          await cloudinary.api.delete_resources(
               doc.images.map((img) => img.filename)
          );
          console.log("Deleted associated reviews and images from Cloudinary.");
     }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
