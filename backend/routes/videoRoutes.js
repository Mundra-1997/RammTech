const express = require("express");
const {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");
const { protect } = require("../middleware/authMiddleware");
const { storage } = require("../config/cloudinary");
const multer = require("multer");

const upload = multer({ storage });
const router = express.Router();

router
  .route("/")
  .get(protect, getVideos)
  .post(protect, upload.single("video"), createVideo);
router
  .route("/:id")
  .put(protect, upload.single("video"), updateVideo)
  .delete(protect, deleteVideo);

module.exports = router;
