const Book = require("../models/book");
const BookRequested = require("../models/bookRequested");

const requestABook = async (req, res) => {
  const { contact_number, course, ...rest } = req.body;
  try {
    let book = await Book.findOne({ isbn: rest.isbn });
    if (!book) {
      book = new Book(...rest);
      await book.save();
    }
    const bookRequested = new BookRequested({
      book,
      user: req.user,
      contact_number,
      course,
    });
    await bookRequested.save();
    res.send(bookRequested);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

//How do I handle multiple user trying to update book with same isbn
const updateBookRequested = async (req, res) => {
  try {
  } catch (error) {}
};

const getAllRequestedBooks = async (req, res) => {
  try {
    const booksRequested = await BookRequested.find({ active: true });
    res.send(booksRequested);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getOneRequestedBook = async (req, res) => {
  try {
    const bookRequested = await BookRequested.findById(req.params.id);
    if (!bookRequested) {
      return res.status(404).send({
        error: "No such book found",
      });
    }
    res.send(bookRequested);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const markRequestedBookAsFound = async (req, res) => {
  try {
    const bookRequested = await BookRequested.findById(req.params.id);
    if (!bookRequested) {
      return res.status(404).send({
        error: "No such book found",
      });
    }
    if (bookRequested.user.toString() !== req.user.id.toString()) {
      return res.status(401).send({
        error: "Not Authorized",
      });
    }
    bookRequested.active = false;
    await bookRequested.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const deleteRequestedBook = async (req, res) => {
  try {
    const bookRequested = await BookRequested.findById(req.params.id);
    if (!bookRequested) {
      return res.status(404).send({
        error: "No such book found",
      });
    }
    if (bookRequested.user.toString() !== req.user.id.toString()) {
      return res.status(401).send({
        error: "Not Authorized",
      });
    }
    await bookRequested.remove();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  requestABook,
  updateBookRequested,
  getAllRequestedBooks,
  getOneRequestedBook,
  markRequestedBookAsFound,
  deleteRequestedBook,
};
