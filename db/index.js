const mongoose = require("mongoose");

async function connectToMongoose() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Course_Registration");
  console.log("Connected to MongoDB database");
}

module.exports = connectToMongoose;
