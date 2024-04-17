import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ImageViewer from "react-simple-image-viewer";

interface ViewerProps {
  setIsViewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[] | undefined;
}

function ImageViewerComponent(props: ViewerProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const { setIsViewerOpen, images } = props;

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <Box w="100%" h="100%" pos="absolute" zIndex={999}>
      {images && images?.length > 0 ? (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside
          onClose={closeImageViewer}
        />
      ) : null}
    </Box>
  );
}

export default ImageViewerComponent;
