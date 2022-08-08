const express = require("express");
const router = express.Router();
const UserDatabase = require("../models/SignUpModel");
const bcrypt = require("bcrypt");

// REGISTER

router.post("/sign-up", async (req, res) => {
  try {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const signedUpUser = new UserDatabase({
      fullName: req.body.fullName,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    //check username
    const isUsernameExist = await UserDatabase.findOne({
      username: req.body.username,
    });
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

    const user = signedUpUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// LOGIN

router.post("/sign-in", async (req, res, next) => {
  try {
    let user = await UserDatabase.findOne({ username: req.body.username });
    if (!user)
      return res
        .status(400)
        .send({ status: 400, message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(400)
        .send({ status: 400, message: "Invalid Email or Password" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.post("/",async (req,res) => {
  try {
    const searchedUser = await UserDatabase.findOne({username : req.body.username})
    .select({password:0})
    res.status(200).json(searchedUser)
  } catch (error) {
    res.status(500).json({msg: error})
  }
})

router.get("/:id",async (req,res) => {
  try {
    const searchedUser = await UserDatabase.findOne({_id : req.params.id})
    .select({password:0})
    res.status(200).json(searchedUser)
  } catch (error) {
    res.status(500).json({msg: error})
  }
})


module.exports = router;
