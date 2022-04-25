const mongoose = require("mongoose");

const sadnabizoaSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const SadnaBizoa = mongoose.model("SadnaBizoa", sadnabizoaSchema);

module.exports = SadnaBizoa;
