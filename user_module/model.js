const { mongoose, Schema } = require("../db/db");

// define schema (structure of our data) for our collection
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email required"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    // required: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  terms: Boolean,
  access: Number,
  joined: {
    type: Date,
    default: Date.now,
  },
});

// create a model or collection -- creates if does not exist, else grabs the collection
const UserModel = mongoose.model("User", UserSchema); //mongodb saves all collection name in small caps, so even though 'User' is specified here, in mongoDB/Atlas you'll see 'user'

// if whenever we create a user we wants certain actions to happen, we can define those actions in this file

// a method to confirm password

// whenever a user is saved, send an email

module.exports = UserModel;
