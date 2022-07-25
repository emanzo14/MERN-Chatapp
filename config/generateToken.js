const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "24h",
  });
};

module.exports = generateToken;
