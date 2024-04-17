import { useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { FaWalking, FaHandHoldingHeart } from "react-icons/fa";
import { TbBeachOff } from "react-icons/tb";
import { Box, Grid, GridItem, HStack, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PansolILove from "../../../assets/pansol-spots/pansol_i_love.webp";
import PansolMangroveWalk from "../../../assets/pansol-spots/pansol_mangrove.webp";
import PansolBaranggayHall from "../../../assets/pansol-spots/pansol_baranggay_hall.webp";
import PansolBeach from "../../../assets/pansol-spots/pansol_beach.webp";

function PansolSpots() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const spots = [
    {
      title: "Pansol Baranggay Hall",
      image: PansolBaranggayHall,
      colSpan: 2,
      rowSpan: 2,
      icon: <AiTwotoneHome />,
    },
    {
      title: "Pansol Mangrove Walkway ",
      image: PansolMangroveWalk,
      colSpan: 2,
      rowSpan: 3,
      icon: <FaWalking />,
    },
    {
      title: "I love Pansol ES",
      image: PansolILove,
      colSpan: 2,
      rowSpan: 3,
      icon: <FaHandHoldingHeart />,
    },
    {
      title: "Pansol Beach",
      image: PansolBeach,
      colSpan: 2,
      rowSpan: 2,
      icon: <TbBeachOff />,
    },
  ];

  return (
    <Grid
      flex={0.7}
      h="100%"
      templateRows="repeat(5, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={3}
      pos="relative"
      paddingTop="5rem"
      // RESPONSIVE ELEMENTS
      transform={{ base: "rotate(0)", lg: "rotate(10deg)" }}
    >
      {spots.map((item) => {
        return (
          <GridItem
            colSpan={item.colSpan}
            rowSpan={item.rowSpan}
            bg="palette.primary"
            key={item.title}
            p=".8rem"
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="-10px 5px 30px rgba(43, 39, 62, .5)"
            gap="1rem"
            onMouseOver={() => setHoveredItem(item.title)}
            onMouseOut={() => setHoveredItem(null)}
            // RESPONSIVE ELEMENTS
            borderRadius={{ base: ".5rem", md: "1rem" }}
          >
            <Box
              boxShadow="-7px 4px 10px rgba(43, 39, 62, .5)"
              overflow="hidden"
              h="100%"
              borderRadius={{ base: ".5rem", md: "1rem" }}
              margin="auto"
              bg="transparent"
              transition="all .3s ease"
            >
              <Image
                h="100%"
                objectFit="cover"
                src={item.image}
                objectPosition="center"
                as={motion.img}
                animate={{
                  scale: item.title === hoveredItem ? 1.4 : 1,
                  transition: {
                    duration: 0.8,
                  },
                }}
                // RESPONSIVE ELEMENTS
                borderRadius={{ base: ".5rem", md: "1rem" }}
              />
            </Box>
            <HStack w="100%" justify="center" p="1rem" borderRadius=".5rem">
              <Text
                color="palette.secondary"
                // RESPONSIVE ELEMENTS
                fontSize={{ base: "1rem", md: "1.5rem" }}
              >
                {item.icon}
              </Text>
              <Text
                textAlign="center"
                color="palette.tertiary"
                fontFamily="poppins"
                fontWeight="light"
                // RESPONSIVE ELEMENTS
                fontSize={{ base: ".7rem", md: ".9rem" }}
              >
                {item.title}
              </Text>
            </HStack>
          </GridItem>
        );
      })}
    </Grid>
  );
}

export default PansolSpots;
