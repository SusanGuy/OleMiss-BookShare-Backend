const mongoose = require("mongoose");

const bookRequestedSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      name: String,
      code: Number,
    },
  },
  {
    timestamps: true,
    toJSON: true,
    toObject: true,
  }
);

const BookRequested = mongoose.model("BookRequested", bookRequestedSchema);

module.exports = BookRequested;
