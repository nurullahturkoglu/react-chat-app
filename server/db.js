const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.URI, () => {
    console.log("database connected");
  });
};

module.exports = dbConnection;
