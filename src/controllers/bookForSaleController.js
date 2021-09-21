const Book = require("../models/book");
const BookForSale = require("../models/bookForSale");

const sellABook = async (req, res) => {
  const { amount, contact_number, picture, condition, course, ...rest } =
    req.body;
  try {
    let book = await Book.findOne({ isbn: rest.isbn });
    if (!book) {
      book = new Book(...rest);
      await book.save();
    }
    const bookForSale = new BookForSale({
      book,
      seller: req.user,
      amount,
      contact_number,
      picture,
      condition,
      course,
    });
    await bookForSale.save();
    res.send(bookForSale);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

//How do I handle multiple user trying to update book with same isbn
const updateBookForSale = async (req, res) => {
  try {
  } catch (error) {}
};

const markBookAsSold = async (req, res) => {
  try {
    const bookForSale = await BookForSale.findById(req.params.id);
    if (!bookForSale) {
      return res.status(404).send({
        error: "No such book found",
      });
    }
    if (bookForSale.seller.toString() !== req.user.id.toString()) {
      return res.status(401).send({
        error: "Not Authorized",
      });
    }
    bookForSale.active = false;
    await bookForSale.save();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getAllBooksOnSale = async (req, res) => {
  try {
    const booksOnSale = await BookOnSale.find({ active: true });
    res.send(booksOnSale);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getOneBookOnSale = async (req, res) => {
  try {
    const bookOnSale = await BookForSale.findById(req.params.id);
    if (!bookForSale) {
      return res.status(404).send({
        error: "No such book found",
      });
    }
    res.send(bookOnSale);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const searchBookOnSale = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteBookOnSale = async (req, res) => {
  try {
    const bookForSale = await BookForSale.findById(req.params.id);
    if (!bookForSale) {
      return res.status(404).send({
        error: "No such book found",
      });
    }
    if (bookForSale.seller.toString() !== req.user.id.toString()) {
      return res.status(401).send({
        error: "Not Authorized",
      });
    }
    await bookForSale.remove();
    res.send();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  sellABook,
  updateBookForSale,
  markBookAsSold,
  getAllBooksOnSale,
  getOneBookOnSale,
  deleteBookOnSale,
  searchBookOnSale,
};
