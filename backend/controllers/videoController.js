const asyncHandler = require("express-async-handler");
const Video = require("../modals/Video");
const cloudinary = require("cloudinary").v2;
const Category = require("../modals/Category");
// import Category from "../modals/Category";
const getVideos = asyncHandler(async (req, res) => {
  const query = req.query.categoryId
    ? { categoryName: req.query.categoryId }
    : {};
  console.log(query);

  const videos = await Video.find(query);

  res.json(videos);
});

const createVideo = asyncHandler(async (req, res) => {
  console.log("incrate");
  const { name, description, category } = req.body;
  console.log(category, "cat");
  const videoUrl = req.file.path;
  const thumbnailUrl = req.file.path;
  const video = new Video({
    name,
    description,
    url: videoUrl,
    thumbnail: thumbnailUrl,
    categoryName: category,
    user: req.user._id,
  });
  const createdVideo = await video.save();
  res.status(201).json(createdVideo);
});

const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (video) {
    if (req.file) {
      // Delete the old video from Cloudinary
      const publicId = video.url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId, { resource_type: "video" });

      video.url = req.file.path;
      video.thumbnail = req.file.path; // Cloudinary generates a thumbnail URL automatically
    }
    video.name = req.body.name || video.name;
    video.description = req.body.description || video.description;

    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } else {
    res.status(404);
    throw new Error("Video not found");
  }
});

const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (video) {
    // Delete the video from Cloudinary
    const publicId = video.url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });

    await video.remove();
    res.json({ message: "Video removed" });
  } else {
    res.status(404);
    throw new Error("Video not found");
  }
});

module.exports = {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
};
