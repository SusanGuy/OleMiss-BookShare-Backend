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
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
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
    toObject: true,
  }
);

const BookForSale = mongoose.model("BookForSale", bookForSaleSchema);

module.exports = BookForSale;
