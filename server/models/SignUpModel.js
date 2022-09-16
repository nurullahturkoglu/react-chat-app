const mongoose = require("mongoose");

const signUpTemplate = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique:true,
      required: true,
    },
    email: {
      type: String,
      unique:true,
      required: true,
    },
    phone: {
      type: String,
      unique:true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarImage:{
      type:String,
      default:"../public/logo192.png"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("users", signUpTemplate);
