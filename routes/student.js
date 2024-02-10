const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtPassword = "secretsCantBeRevealed";
const Student = require("../db/models/Student");
const {
  signupMiddleware,
  loginStudentMiddleware,
} = require("../middleware/user");
const path = require('path');
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/student-signup.html'));
});
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/student-login.html'));
});
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/student-dashboard.html'));
});
router.post("/signup", signupMiddleware, async (req, res) => {
  try {
    let student = await Student.findOne({ email: req.body.email });
    if (student) {
      res.status(401).send("Email already taken");
      console.log(student);
      return;
    }
    const payloadObject = {
      email: req.body.email,
      role: req.body.role,
    };
    student = new Student(req.body);
    await student.save();
    const token = jwt.sign(payloadObject, jwtPassword);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Could not login", error.message);
    res.status(500).send("Could not save student");
  }
});
router.post("/login", loginStudentMiddleware, async (req, res) => {
  const payloadObject = {
    email: req.body.email,
    role: "student",
  };

  try {
    const token = jwt.sign(payloadObject, jwtPassword);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
