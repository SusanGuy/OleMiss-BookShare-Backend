const mongoose = require("mongoose");

const bookForSaleSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    contact_number: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      required: true,
      trim: true,
    },
    condition: {
      type: String,
      enum: ["NEW", "USED"],
      default: "USED",
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
  }
);

const BookForSale = mongoose.model("BookForSale", bookForSaleSchema);

module.exports = BookForSale;
