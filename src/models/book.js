const mongoose = require("mongoose");
const validator = require("validator");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error("Book Title cannot be empty!");
        }
      },
    },
    isbn: {
      type: Number,
      length: 13,
      trim: true,
      required: true,
      unique: true,
    },
    publisher: {
      type: String,
      trim: true,
      required: true,
    },
    published_date: {
      type: Date,
    },
    edition: {
      type: Number,
    },
    authors: [
      {
        first_name: {
          type: String,
          required: true,
          trim: true,
        },
        last_name: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { toJSON: true, toObject: true, timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
