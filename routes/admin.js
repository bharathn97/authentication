const express = require("express");
const router = express.Router();
const Admin = require("../db/models/Admin");
const jwt = require("jsonwebtoken");
const jwtPassword = "secretsCantBeRevealed";
const {
  signupMiddleware,
  loginAdminMiddleware,
  validateAdminUser,
} = require("../middleware/user");
const path = require('path');
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin-signup.html'));
});
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin-login.html'));
});
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin-dashboard.html'));
});
router.post("/signup", signupMiddleware, async (req, res) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      res.status(401).send("Email already taken");
      console.log(admin);
      return;
    }
    const payloadObject = {
      email: req.body.email,
      role: req.body.role,
    };
    admin = new Admin(req.body);
    await admin.save();
    const token = jwt.sign(payloadObject, jwtPassword);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Could not login", error.message);
    res.status(500).send("Could not save admin");
  }
});
router.post("/login", loginAdminMiddleware, async (req, res) => {
  try {
    const payloadObject = {
      email: req.body.email,
      role: "admin",
    };
    const token = jwt.sign(payloadObject, jwtPassword);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
