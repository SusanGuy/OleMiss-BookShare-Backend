const mongoose = require("mongoose");
const reportsSchema = new mongoose.Schema({
  selling: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookForSale",
    },
  ],
  requesting: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookRequested",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
