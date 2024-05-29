"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoModal from "../videoModal/index";
import { getToken, removeToken } from "../../../utils/auth";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
const VideosPage = () => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = getToken();
        const categoryResponse = await axios.get(
          "http://localhost:5000/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    fetchVideosByCategory();
  }, [selectedCategory]);

  const fetchVideosByCategory = async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        `http://localhost:5000/api/videos?categoryId=${selectedCategory}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchVideosByCategory();
    }
  }, [selectedCategory]);
  const openVideoModal = (url) => {
    console.log("Opening video modal for:", url);
    setSelectedVideo(url);
  };
  const closeVideoModal = () => {
    setSelectedVideo(null);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLogout = () => {
    removeToken();
    alert("Logged out successfully");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Categories and Videos
        </h1>

        <div
          className="bg-indigo-600 text-white py-1 px-4 rounded w-[30%] text-center "
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>

      <div className="mb-6 flex gap-3 justify-between items-end">
        <div className="w-[50%]">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
          >
            <option value="">-- All Categories --</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[50%] flex gap-2">
          <Link
            className="bg-indigo-600 text-white py-1 px-4 rounded text-center "
            href="/create-category"
          >
            Add Categories
          </Link>
          <Link
            href="/create-video"
            className="bg-indigo-600 text-white py-1 px-4 rounded text-center  "
          >
            Upload video
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Video Name: {video.name}
            </h2>
            <p className="text-lg font-semibold mb-4 text-black">
              Video Description: {video.description}
            </p>
            <div className="flex flex-col items-center">
              <img
                src={video.thumbnailUrl}
                alt={video.name}
                className="w-full h-48 object-cover rounded mb-2 cursor-pointer"
                onClick={() => openVideoModal(video.url)}
              />
              <button
                className="bg-indigo-600 text-white py-1 px-4 rounded"
                onClick={() => openVideoModal(video.url)}
              >
                Play {video.name}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <VideoModal url={selectedVideo} onClose={closeVideoModal} />
      )}
    </div>
  );
};

export default VideosPage;
