import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { AiOutlineFileText } from "react-icons/ai";
import { BsCalendar2Event } from "react-icons/bs";
import { HiOutlineNewspaper } from "react-icons/hi";
import { useState } from "react";

interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

function Categories(props: CategoriesProps) {
  const { activeCategory, setActiveCategory } = props;

  const categories = [
    { name: "Random", icon: <AiOutlineFileText /> },
    { name: "Documents", icon: <AiOutlineFileText /> },
    { name: "Events", icon: <BsCalendar2Event /> },
    { name: "News", icon: <HiOutlineNewspaper /> },
  ];

  return (
    <VStack marginTop="1rem">
      {categories.map((category) => {
        return (
          <Flex
            p="1rem"
            alignItems="center"
            w="100%"
            key={category.name}
            cursor="pointer"
            borderLeft={activeCategory === category.name ? "2px solid" : ""}
            borderLeftColor={
              activeCategory === category.name ? "palette.secondary" : ""
            }
            onClick={() => setActiveCategory(category.name)}
          >
            <Box
              flex={1}
              fontSize="1.2rem"
              opacity={activeCategory === category.name ? "1" : ".6"}
              color={
                activeCategory === category.name
                  ? "palette.secondary"
                  : "palette.tertiary"
              }
            >
              {category.icon}
            </Box>
            <Text
              flex={3}
              fontFamily="inter"
              opacity={activeCategory === category.name ? "1" : ".7"}
              fontWeight="medium"
              color={
                activeCategory === category.name
                  ? "palette.secondary"
                  : "palette.tertiary"
              }
            >
              {" "}
              {category.name}
            </Text>
          </Flex>
        );
      })}
    </VStack>
  );
}

export default Categories;
