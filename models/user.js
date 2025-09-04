/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
     // username and password will be added by passport-local-mongoose
     email: {
          type: String,
          required: true,
          unique: true,
     },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
