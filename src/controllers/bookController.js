const Book = require("../models/book");
const BookForSale = require("../models/bookForSale");
const BookRequested = require("../models/bookRequested");

const createABook = async (req, res) => {
  try {
  } catch (error) {}
};

const getABook = async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(400).send({
        error: "Book not found",
      });
    }
    res.send(book);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  createABook,
  getABook,
  getAllBooks,
  deleteBook,
};
