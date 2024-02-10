const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "student",
  },
});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
