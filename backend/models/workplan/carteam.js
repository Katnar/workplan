const mongoose = require("mongoose");

const carteamSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const CarTeam = mongoose.model("CarTeam", carteamSchema);

module.exports = CarTeam;
