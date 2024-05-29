// components/VideoModal.js
import React from "react";

const VideoModal = ({ url, onClose }) => {
  console.log("VideoModal received videoUrl:", url);
  if (!url) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-2xl w-full">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            Close
          </button>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            width="100%"
            height="315"
            src={url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Player"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
