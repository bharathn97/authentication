
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../db/models/Student");
const Admin = require("../db/models/Admin");
const jwtPassword = "secretsCantBeRevealed";

const signupMiddleware = async (req, res, next) => {
  try {
    if (req.body) {
      const saltLength = 10;
      const secPass = await bcrypt.hash(req.body.password, saltLength);
      req.body.password = secPass;
      next();
    } else {
      console.error(
        "Invalid credentials",
        result.error.errors.map((e) => e.message)
      );
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error occured in signup of user", error.message);
    res.status(500).send("Some internal error occured");
  }
};

const loginStudentMiddleware = async (req, res, next) => {
  try {
    if (req.body) {
      const foundUser = await Student.findOne({ email: req.body.email });
      if (foundUser) {
        const validUser = await bcrypt.compare(
          req.body.password,
          foundUser.password
        );
        if (validUser) next();
        else {
          console.log("Invalid credentials");
          res.status(401).send("Invalid credentials");
        }
      } else {
        console.log("Invalid credentials");
        res.status(401).send("Invalid credentials");
      }
    } else {
      console.error(
        "Invalid credentials",
        result.error.errors.map((e) => e.message)
      );
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error occured in zod of user", error.message);
    res.status(500).send("Some internal error occured");
  }
};
const validateStudentUser = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, jwtPassword, async (err, decodedToken) => {
    if (err) {
      console.error("Unauthorized user: ", err.message);
      res.status("401").send("Unauthorized user");
    } else {
      const user = await Student.findOne({ email: decodedToken.email }).select(
        "-password"
      );
      req.user = user;
      next();
    }
  });
};



const loginAdminMiddleware = async (req, res, next) => {
  try {
    if (req.body) {
      const foundUser = await Admin.findOne({ email: req.body.email });
      if (foundUser) {
        const validUser = await bcrypt.compare(
          req.body.password,
          foundUser.password
        );
        if (validUser) next();
        else {
          console.log("Invalid credentials");
          res.status(401).send("Invalid credentials");
        }
      } else {
        console.log("Invalid credentials");
        res.status(401).send("Invalid credentials");
      }
    } else {
      console.error(
        "Invalid credentials",
        result.error.errors.map((e) => e.message)
      );
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error occured in zod of user", error.message);
    res.status(500).send("Some internal error occured");
  }
};
const validateAdminUser = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, jwtPassword, async (err, decodedToken) => {
    if (err) {
      console.error("Unauthorized user: ", err.message);
      res.status("401").send("Unauthorized user");
    } else {
      const user = await Admin.findOne({ email: decodedToken.email }).select(
        "-password"
      );
      req.user = user;
      next();
    }
  });
};

module.exports = {
  signupMiddleware,
  loginStudentMiddleware,
  validateStudentUser,
  loginAdminMiddleware,
  validateAdminUser,
};
