const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  loginUser,
  signupUser,
  getLoggedInUserInfo,
  logout,
  updateUser,
  deleteUser,
  getUserBookmarks,
} = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/me", auth, getLoggedInUserInfo);
router.post("/logout", auth, logout);
router.patch("/me", auth, updateUser);
router.delete("/me", auth, deleteUser);
router.get("/me/bookmarks", auth, getUserBookmarks);

module.exports = router;
