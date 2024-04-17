import { Box, Text, VStack } from "@chakra-ui/react";
import useObserver from "../../hooks/useObserver";
import breakPoints from "../../utils/interfaces/Breakpoints";

function TermsOfService() {
  const { ref } = useObserver("Terms of Service");

  return (
    <Box ref={ref} w={breakPoints} margin="auto" paddingBlockStart="12rem">
      <Box maxW="60rem" margin="auto">
        <Text fontWeight="bold" fontFamily="inter" fontSize="1.2rem">
          Terms of Service
        </Text>
        <VStack gap="1rem" marginTop="2rem">
          <Text>
            Welcome to Pansol Website. By accessing or using our website and
            services, you agree to be bound by the following terms and
            conditions. If you do not agree with any of these terms, you should
            not use our website.
          </Text>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Use of Services:
            </Text>
            <Text>
              You may use our website and services only for lawful purposes and
              in accordance with these terms. You may not use our website or
              services to:
            </Text>
          </VStack>
          <Text>
            Transmit any unlawful, harmful, threatening, abusive, harassing,
            defamatory, vulgar, obscene, or otherwise objectionable material.
            Infringe on any intellectual property rights or other proprietary
            rights.
          </Text>
          <Text>
            Transmit any material that contains viruses, Trojan horses, worms,
            time bombs, or other computer programming routines that are intended
            to damage, interfere with, or disrupt the normal functioning of our
            website or services.
          </Text>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Content and Intellectual Property
            </Text>
            <Text>
              The content on our website, including but not limited to text,
              images, software, and other material, is protected by copyright,
              trademark, and other intellectual property laws. You may not
              modify, copy, distribute, display, publish, sell, license, or
              create derivative works based on the content on our website
              without our express written consent.
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Third-Party Sites
            </Text>
            <Text>
              Our website may contain links to third-party sites. We are not
              responsible for the privacy practices or content of these sites,
              and you access them at your own risk
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Disclaimers and Limitation of Liability
            </Text>
            <Text>
              Our website and services are provided on an "as is" and "as
              available" basis. We do not guarantee the accuracy, completeness,
              or availability of our website or services. We will not be liable
              for any damages arising from your use of our website or services.
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Modification of Terms
            </Text>
            <Text>
              We may modify these terms at any time. Your continued use of our
              website following any changes to these terms constitutes your
              acceptance of the changes.
            </Text>
          </VStack>
          <VStack w="100%" align="start">
            <Text fontFamily="inter" fontWeight="semibold">
              Contact Information
            </Text>
            <Text>
              If you have any questions or concerns about these terms,please
              email at us pansolwebsite@gmail.com.
            </Text>
          </VStack>
          <Text w="100%" fontFamily="inter" fontWeight="semibold">
            Effective Date: December 2025
          </Text>
          <Text w="100%" fontFamily="inter" fontWeight="semibold">
            Pansol Website
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default TermsOfService;
