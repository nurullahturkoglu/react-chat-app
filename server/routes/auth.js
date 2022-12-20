const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserDatabase = require("../models/SignUpModel");
const bcrypt = require("bcrypt");
const { protect } = require("../middleware/authMiddleware");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: "7d",
  });
};

// @desc Register to app
// @route /login/sign-up
// @access PUBLIC

router.post("/sign-up", async (req, res) => {
  try {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const { fullName, username, email, phone } = req.body;

    if (!fullName || !username || !email || !phone) {
      return res.status(400).json({ err: "Please fill all field" });
    }
    //create user model
    const signedUpUser = new UserDatabase({
      fullName,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    const isUsernameExist = await UserDatabase.findOne({
      username: req.body.username,
    });

    //check username
    if (isUsernameExist)
      return res.status(404).json({ err: "this username already exist" });

    //check email
    const isEmailExist = await UserDatabase.findOne({ email: req.body.email });
    if (isEmailExist)
      return res.status(404).json({ err: "this email already exist" });

    //check phone
    const isPhoneExist = await UserDatabase.findOne({ phone: req.body.phone });
    if (isPhoneExist)
      return res.status(404).json({ err: "this phone number already exist" });

    // save on database
    const user = signedUpUser.save();

    res.status(200).json({
      username,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// @desc Login to app
// @route /login/sign-in
// @access PUBLIC

router.post("/sign-in", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400);
      throw new Error("Please fill all field");
    }

    let user = await UserDatabase.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);

    if (!user || !validPassword) {
      return res
        .status(400)
        .send({ status: 400, message: "Invalid Username or Password" });
    }

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (Error) {
    res.status(500).json({ msg: Error });
  }
});

// @desc Get user's infos from username
// @route /login
// @access PUBLIC
// @note PLEASE USE /login/:id. THIS IS JUST CREATED FOR TEST

router.post("/", async (req, res) => {
  try {
    const user = await UserDatabase.findOne({
      username: req.body.username,
    }).select("-password");

    if (user) {
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(404).json({ msg: "didn't find" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// @desc Get user's infos from user id
// @route /login/:id
// @access PUBLIC

router.get("/:id",protect, async (req, res) => {
  try {
    const user = await UserDatabase.findOne({
      _id: req.params.id,
    }).select({ password: 0 });

    if (user) {
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(404).json({ msg: "didn't find" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// @desc Get all users
// @route /login/users
// @access PUBLIC

router.get("/user",protect, async (req, res) => {
  try {
    const user = await UserDatabase.find().select({ password: 0 });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "didn't find" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = router;
