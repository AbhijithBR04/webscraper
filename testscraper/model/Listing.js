const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  datePosted: Date,
  neighborhood: String,
  url: String,
  jobdesc: String,
  compe: String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;