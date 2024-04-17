import { Highlight, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

function MessageCard() {
  return (
    <VStack
      align="start"
      spacing="1.5rem"
      p="1.5rem"
      borderRadius=".5rem"
      maxW="65rem"
      margin="auto"
      bg="palette.tertiary"
      marginTop="5rem"
    >
      <HStack gap="1rem">
        <Text
          color="palette.accent"
          fontSize="1.3rem"
          fontFamily="inter"
          fontWeight="bold"
        >
          From the Health Center.
        </Text>
      </HStack>
      <Text color="palette.primary" fontWeight="light">
        Ang Health Center ay na nagsasagawa din ng injection para sa
        contraceptive na may bisa na 3 buwan. May mga pills din na ipinamimigay
        na kailangang kada buwan. Nagsasagawa din ang health center ng Tubal
        Ligation o tali. May supply din ng condom ang health center na libreng
        ibinibigay sa mga nais. May mga gamot ding ipinamimigay para sa mga
        batang nagtatae. Nagkacouncil din ang Health Center patungkol sa tamang
        nutrition na ibinibigay sa isang sanggol.
      </Text>
      <Text color="palette.primary" fontWeight="light">
        <Highlight
          query={["January", "July"]}
          styles={{ color: "palette.accent", fontWeight: "semibold" }}
        >
          Tuwing January at July isinasagawa ang deworming, ito ay may 6 na
          buwang pagitan.
        </Highlight>
      </Text>
      <Text color="palette.primary" fontWeight="light">
        <Highlight
          query={["April", "October"]}
          styles={{ color: "palette.accent", fontWeight: "semibold" }}
        >
          Tuwing April at October isinasagawa ang Vitamin A Supplementation
          simula 6 to 11 months hanggang 11 to 59 months (5 years old).
        </Highlight>
      </Text>
    </VStack>
  );
}

export default MessageCard;
