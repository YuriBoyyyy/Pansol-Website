import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { Link, Stack, VStack } from "@chakra-ui/react";

function Socials() {
  return (
    <Stack
      direction={{ base: "row", lg: "column" }}
      alignSelf="center"
      p="1rem"
      fontSize="1.5rem"
      gap="1rem"
      color="#8672FF"
    >
      <Link
        href="https://www.facebook.com/brgypansollp?mibextid=ZbWKwL"
        target="_blank"
      >
        <BsFacebook />
      </Link>
    </Stack>
  );
}

export default Socials;
