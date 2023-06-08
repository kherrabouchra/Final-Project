import React from 'react';
import { UploadButton } from './styles';

const VideoUploader = ({ onUpload }) => {
  const handleUpload = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dub9jmuyb',
        uploadPreset: 'demon1am',
        resourceType: 'video',
        multiple: false,
        maxFiles: 1,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          const videoUrl = result.info.url;
          onUpload(videoUrl);
        }
      }
    );
  };

  return (
    <div>
      <UploadButton onClick={handleUpload}>Select Video</UploadButton>
    </div>
  );
};

export default VideoUploader;
