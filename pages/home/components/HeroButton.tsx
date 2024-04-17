import { Button, HStack, Text } from "@chakra-ui/react";
import { BsPencilSquare, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function HeroButton() {
  const navigate = useNavigate();

  return (
    <HStack
      justify="start"
      w="100%"
      spacing={{ base: "1rem", md: "1.5rem" }}
      paddingTop="1rem"
      zIndex={1}
    >
      <Button
        bg="palette.primary"
        color="palette.secondary"
        fontFamily="inter"
        fontWeight="medium"
        transition="all .3s ease"
        p="1.8em 1em"
        onClick={() => navigate("services/schedule_appointments")}
        leftIcon={
          <Text color="palette.secondary" fontSize="1.2rem">
            <BsPencilSquare />
          </Text>
        }
        _hover={{
          bg: "palette.primary_hover",
        }}
        // RESPONSIVE ELEMENTS
        fontSize={{ base: ".9rem", md: "1.1rem" }}
      >
        Make Appointment
      </Button>
      <Button
        bg="transparent"
        color="palette.primary"
        border="1px solid"
        borderColor="palette.primary"
        fontFamily="inter"
        fontWeight="medium"
        p="1.7em 1.1em"
        transition="all .3s ease"
        onClick={() => navigate("forum")}
        rightIcon={
          <Text color="palette.body" fontSize="1.5rem">
            <BsArrowRight />
          </Text>
        }
        _hover={{
          bg: "palette.secondary_hover",
        }}
        // RESPONSIVE ELEMENTS
        fontSize={{ base: ".9rem", md: "1.1rem" }}
      >
        Join forum
      </Button>
    </HStack>
  );
}

export default HeroButton;
