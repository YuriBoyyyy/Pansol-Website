import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { AspectRatio, Box, Flex, Image } from "@chakra-ui/react";

interface SliderProps {
  images: string[] | undefined;
}

function ProgramImageSlider(props: SliderProps) {
  const { images } = props;
  return (
    <Box
      paddingBlockStart="3rem"
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
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{ clickable: true, type: "progressbar" }}
        spaceBetween={50}
        slidesPerView={3}
        style={{ padding: "2rem" }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {images?.map((image) => {
          return (
            <SwiperSlide key={image}>
              <AspectRatio ratio={2 / 2}>
                <Flex
                  w="15rem"
                  h="15rem"
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

export default ProgramImageSlider;
