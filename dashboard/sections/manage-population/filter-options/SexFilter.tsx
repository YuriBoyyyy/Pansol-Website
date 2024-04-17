import { Box, Center, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { usePopulation } from "../../../../context/ManagePopulationContext";

function SexFilter() {
  const population = usePopulation();
  return (
    <Center paddingBlockStart="1.5rem" w="100%">
      <RadioGroup
        defaultValue={population?.selectedSex}
        onChange={(e) => population?.setSelectedSex(e)}
      >
        <HStack spacing="1.5rem">
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </HStack>
      </RadioGroup>
    </Center>
  );
}

export default SexFilter;
