import React from "react";
import { UploadButton } from "./styles";
import { BlackBtn } from "../../Global/GlobalComponents";

const CsvUploader = ({ onUpload, lessonIndex }) => {
  const handleUpload = () => {
    const uploadOptions = {
      cloudName: "dub9jmuyb",
      uploadPreset: "emerhwkt",
      resourceType: "auto", // or 'raw' to force raw file handling
      multiple: false,
      maxFiles: 1,
      accept: ".csv",
    };

    window.cloudinary.openUploadWidget(uploadOptions, (error, result) => {
      if (!error && result && result.event === "success") {
        const fileUrl = result.info.url;
        onUpload(fileUrl, lessonIndex); // Pass the file URL to the parent component
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
          width: "180px"
        }}
        onClick={handleUpload}
      >
        Select CSV File
      </BlackBtn>
    </div>
  );
};

export default CsvUploader;
