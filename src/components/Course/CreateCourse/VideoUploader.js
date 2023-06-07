import React from "react";
import { UploadButton } from "./styles";
import { BlackBtn } from "../../Global/GlobalComponents";

const VideoUploader = ({ onUpload, lessonIndex }) => {
  const handleUpload = () => {
    const uploadOptions = {
      cloudName: "dub9jmuyb",
      uploadPreset: "demon1am",
      resourceType: "video",
      multiple: false,
      maxFiles: 1,
      accept: "video/*",
    };

    window.cloudinary.openUploadWidget(uploadOptions, (error, result) => {
      if (!error && result && result.event === "success") {
        const videoUrl = result.info.url;
        onUpload(videoUrl, lessonIndex); // Pass the video URL and lesson index to the parent component
      }
    });
  };

  return (
    <div>
      <BlackBtn
        style={{
          fontSize: "16px",
          margin: "5px 200px",
          padding: "8px 14px",
          borderRadius: "50px",
          backgroundColor: "black",
          border: "none",
          color: "white",
          cursor: "pointer",
          width: "150px",
        }}
        onClick={handleUpload}
      >
        Select Video
      </BlackBtn>
    </div>
  );
};

export default VideoUploader;
