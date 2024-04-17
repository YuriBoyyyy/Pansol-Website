import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import DoughnutChart from "./DoughnutChart";
import SectionTitle from "./SectionTitle";

function VaccinationOverview() {
  return (
    <GridItem paddingBlock="2rem" bg="#FCFCFC" colSpan={1} rowSpan={2}>
      <Flex justify="center" h="100%" margin="auto" flexDir="column">
        <SectionTitle title="Vaccination Overview" justify="center" />
        <DoughnutChart />
        <HStack
          fontSize=".8rem"
          fontWeight="medium"
          fontFamily="inter"
          marginTop="1rem"
          w="100%"
          justify="center"
          spacing="2rem"
        >
          <HStack>
            <Box w="1rem" h="1rem" borderRadius="50%" bg="#FF6A55" />
            <Text color="#FF6A55">Vaccinated</Text>
          </HStack>
          <HStack>
            <Box w="1rem" h="1rem" borderRadius="50%" bg="#FFA69A" />
            <Text color="#FFA69A">First Dose</Text>
          </HStack>
          <HStack>
            <Box w="1rem" h="1rem" borderRadius="50%" bg="#D9D9D9" />
            <Text color="#D9D9D9">Unvaccinated</Text>
          </HStack>
        </HStack>
        {/* <Center marginTop="1.5rem" paddingInline="5rem">
          <Button
            p="1.6rem"
            w="100%"
            bg="transparent"
            border="1px solid #FF6A55"
            color="#FF6A55"
            rightIcon={<BsArrowRight />}
          >
            More Details
          </Button>
        </Center> */}
      </Flex>
    </GridItem>
  );
}

export default VaccinationOverview;
