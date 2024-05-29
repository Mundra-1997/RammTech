const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getCategories).post(protect, createCategory);
router
  .route("/:id")
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;
