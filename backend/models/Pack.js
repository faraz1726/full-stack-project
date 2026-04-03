const mongoose = require("mongoose");

const packSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  pickup: String,
  drop: String,
  truck: String
});

module.exports = mongoose.model("Pack", packSchema);