import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { AspectRatio, Box, Flex, Image } from "@chakra-ui/react";

interface SliderProps {
  images: string[] | undefined;
}

function SpotsImageSlider(props: SliderProps) {
  const { images } = props;
  return (
    <Box
      w="100%"
      sx={{
        ".swiper-pagination": {
          pos: "absolute",
          bg: "transparent",
        },
        ".swiper-pagination-progressbar-fill": {
          bg: "linear-gradient(to right, rgba(0, 0, 0, .1), #6250CE)",
          opacity: ".8",
        },
      }}
    >
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        pagination={{ clickable: true, type: "progressbar" }}
        spaceBetween={50}
        slidesPerView={2}
        style={{ padding: "2rem" }}
        // breakpoints={{
        //   0: {
        //     slidesPerView: 1,
        //     spaceBetween: 20,
        //   },
        //   768: {
        //     slidesPerView: 2,
        //     spaceBetween: 30,
        //   },
        //   1280: {
        //     slidesPerView: 3,
        //     spaceBetween: 40,
        //   },
        // }}
      >
        {images?.map((image) => {
          return (
            <SwiperSlide key={image}>
              <AspectRatio ratio={2 / 2}>
                <Flex
                  w="20rem"
                  h="20rem"
                  bg="#F6F5FF"
                  borderRadius=".5rem"
                  boxShadow="5px 5px 18px rgba(43, 39, 62, .25)"
                  p=".8rem"
                  cursor="pointer"
                >
                  <Image
                    borderRadius=".5rem"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    objectPosition="center"
                    src={image}
                  />
                </Flex>
              </AspectRatio>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

export default SpotsImageSlider;
