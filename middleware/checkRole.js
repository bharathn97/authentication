const jwt = require("jsonwebtoken");
const jwtPassword = "secretsCantBeRevealed";

const {
  validateStudentUser,
  validateAdminUser,
  validateFacultyUser,
} = require("./user");

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = jwt.decode(authHeader);
    const role = token.role;
    if (allowedRoles.includes(role)) {
      req.role = role;
      next();
    } else {
      console.error("Unauthorized");
      res.status(401).send("Unauthorized");
    }
  };
};

const assignRole = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = jwt.decode(authHeader);
  const role = token.role;
  req.role = role;
  next();
};

const validateUser = (req, res, next) => {
  const role = req.role;
  if (role === "admin") {
    return validateAdminUser(req, res, next);
  } else if (role === "student") {
    return validateStudentUser(req, res, next);
  }  else {
    console.error("Invalid role");
    res.status(401).send("Invalid role");
  }
};

module.exports = { checkRole, validateUser, assignRole };
