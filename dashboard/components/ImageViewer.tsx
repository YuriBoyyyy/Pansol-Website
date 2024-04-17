import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";

function ImageViewerComponent() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    "http://placeimg.com/1200/800/nature",
    "http://placeimg.com/800/1200/nature",
    "http://placeimg.com/1920/1080/nature",
    "http://placeimg.com/1500/500/nature",
  ];

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <ImageViewer
      src={images}
      currentIndex={currentImage}
      disableScroll={false}
      closeOnClickOutside
      onClose={closeImageViewer}
    />
  );
}

export default ImageViewerComponent;
