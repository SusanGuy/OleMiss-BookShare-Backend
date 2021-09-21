const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  markBookAsSold,
  deleteBookOnSale,
  getOneBookOnSale,
  getAllBooksOnSale,
  updateBookForSale,
  sellABook,
  searchBookOnSale,
} = require("../controllers/bookForSaleController");

router.post("/", auth, sellABook);
router.patch("/:id", auth, updateBookForSale);
router.get("/:id", auth, getOneBookOnSale);
router.get("/", auth, getAllBooksOnSale);
router.get("/:text", auth, searchBookOnSale);
router.post("/markFound", auth, markBookAsSold);
router.delete("/:id", auth, deleteBookOnSale);

module.exports = router;
