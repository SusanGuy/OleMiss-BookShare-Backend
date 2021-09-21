const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  requestABook,
  updateBookRequested,
  markRequestedBookAsFound,
  deleteRequestedBook,
  getAllRequestedBooks,
  getOneRequestedBook,
} = require("../controllers/bookRequestedController");

router.post("/", auth, requestABook);
router.patch("/:id", auth, updateBookRequested);
router.get("/:id", auth, getOneRequestedBook);
router.get("/", auth, getAllRequestedBooks);
router.post("/markFound", auth, markRequestedBookAsFound);
router.delete("/:id", auth, deleteRequestedBook);

module.exports = router;
