const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  requestABook,
  markRequestedBookAsFound,
  deleteRequestedBook,
  getAllRequestedBooks,
} = require("../controllers/bookRequestedController");

router.get("/", auth, getAllRequestedBooks);
router.post("/", auth, requestABook);
router.post("/markFound/:id", auth, markRequestedBookAsFound);
router.delete("/:id", auth, deleteRequestedBook);

module.exports = router;
