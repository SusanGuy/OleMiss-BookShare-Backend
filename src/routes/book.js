const router = require("express").Router();
const {
  getAllBooks,
  getABook,
  deleteBook,
  createABook,
} = require("../controllers/bookController");

router.post("/", createABook);
router.get("/", getAllBooks);
router.get("/:isbn", getABook);
router.delete("/:isbn", deleteBook);

module.exports = router;
