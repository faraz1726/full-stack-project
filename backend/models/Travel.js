const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  passengers: Number,
  service: String,
  details: String
});

module.exports = mongoose.model("Travel", travelSchema);