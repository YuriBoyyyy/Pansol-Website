import { Heading, Highlight, Text } from "@chakra-ui/react";

function HeroText() {
  return (
    <>
      <Heading
        color="palette.primary"
        zIndex={1}
        // RESPONSIVE ELEMENTS
        fontSize={{ base: "2.5rem", md: "3.8rem", "2xl": "4.5rem" }}
      >
        <Highlight
          query="Pansol"
          styles={{
            color: "palette.accent",
          }}
        >
          Connecting you to Pansol Community.
        </Highlight>
      </Heading>
      <Text
        fontFamily="poppins"
        fontWeight="light"
        color="palette.primary"
        lineHeight="2rem"
        textAlign="start"
        // RESPONSIVE ELEMENTS
        w={{ base: "100%", md: "80%" }}
        fontSize={{ base: ".95rem", md: "1.1rem" }}
      >
        A convenient, online hub for all things barangay-related. From local
        news to community events, we've got you covered.
      </Text>
    </>
  );
}

export default HeroText;
