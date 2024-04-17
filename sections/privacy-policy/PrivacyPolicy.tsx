import { Box, Text, VStack } from "@chakra-ui/react";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";

function PrivacyPolicy() {
  const { ref } = useObserver("Privacy Policy");
  return (
    <Box ref={ref} w={breakPoints} margin="auto" paddingBlockStart="12rem">
      <Box maxW="60rem" margin="auto">
        <Text fontWeight="bold" fontFamily="inter" fontSize="1.2rem">
          Privacy Policy for Pansol Website
        </Text>
        <VStack gap="1rem" marginTop="2rem">
          <Text>
            This privacy policy outlines the information that the Pansol website
            collects from its users, how it is used and protected, and the
            rights of individuals with regard to their personal information.
          </Text>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Information Collection:
            </Text>
            <Text>
              The Pansol website collects personal information, such as names,
              addresses, email addresses, and phone numbers, when users interact
              with the website. This information is collected through online
              forms, surveys, and contact forms.
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Use of Personal Information:
            </Text>
            <Text>
              The personal information collected by the Barangay website is used
              for the following purposes:
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Use of Personal Information:
            </Text>
            <Text>
              The personal information collected by the Barangay website is used
              for the following purposes: To respond to inquiries and requests
              for information; To provide updates and news about Barangay
              services and programs; To improve the quality of the website and
              its services To send periodic emails with information that may be
              of interest to users
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Protection of Personal Information:
            </Text>
            <Text>
              The Pansol website takes the protection of personal information
              seriously and implements reasonable security measures to protect
              it from unauthorized access, use, or disclosure.
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Storage and Protection of Information
            </Text>
            <Text>
              We take appropriate technical and organizational measures to
              protect your personal information from unauthorized access, use,
              or disclosure. We store your information on secure servers and use
              encryption to protect sensitive information.
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Rights of Individuals:
            </Text>
            <Text>
              Individuals have the right to access and control their personal
              information, including the right to request its correction,
              deletion, or restriction of use. To exercise these rights,
              individuals can contact the Barangay website by email.
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Data Retention
            </Text>
            <Text>
              We retain your personal information for as long as necessary to
              provide you with the services you request and as required by law.
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Cookies and Tracking Technologies
            </Text>
            <Text>
              We use cookies and other tracking technologies to improve your
              experience on our website and to understand how you use our
              services. You may disable cookies in your browser settings,
              although some parts of our website may not function properly if
              cookies are disabled.
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Changes to the Privacy Policy:
            </Text>
            <Text>
              This privacy policy may be updated periodically to reflect changes
              to the Pansol's website’s information collection, use, and
              protection practices.
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Contact Information
            </Text>
            <Text>
              If you have any questions or concerns about our Privacy Policy or
              the protection of your personal information, please email us at
              pansolwebsite@gmail.com.
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default PrivacyPolicy;
