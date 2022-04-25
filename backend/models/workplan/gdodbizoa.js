const mongoose = require("mongoose");

const gdodbizoaSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const GdodBizoa = mongoose.model("GdodBizoa", gdodbizoaSchema);

module.exports = GdodBizoa;
