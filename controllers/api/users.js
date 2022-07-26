const User = require("../../models/user");
const asyncHandler = require("express-async-handler");
const generateToken = require("../../config/generateToken");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // console.log(`boy ${user.name} has been created`);
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
    console.log(user.id);
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  console.log(users);
  res.send(users);
});

module.exports = { createUser, authUser, searchUsers, checkToken };

// async function createUser(req, res) {
//   try {
//     const user = await User.create(req.body);
//     // token will be a string
//     const token = createJWT(user);
//     // send back the token as a string
//     // which we need to account for
//     // in the client
//     res.json(token);
//   } catch (e) {
//     res.status(400).json(e);
//   }
// }

// function createJWT(user) {
//   return jwt.sign(
//     // data payload
//     { user },
//     process.env.SECRET,
//     { expiresIn: "24h" }
//   );
// }

// async function login(req, res) {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) throw new Error();
//     const match = await bcrypt.compare(req.body.password, user.password);
//     if (!match) throw new Error();
//     res.json(createJWT(user));
//   } catch {
//     res.status(400).json("Bad Credentials");
//   }
// }
