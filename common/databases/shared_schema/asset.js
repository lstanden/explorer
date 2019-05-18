const mongoose = require("mongoose");

const asset = new mongoose.Schema(
  {
    name: { type: String },
    isDefault: { type: Boolean },
    folder: { type: String }
  },
  { _id: false }
);

module.exports = asset;
