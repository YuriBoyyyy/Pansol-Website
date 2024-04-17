import { Center, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import React from "react";
import { usePopulation } from "../../../../context/ManagePopulationContext";

function RegisteredVoterFilter() {
  const population = usePopulation();
  return (
    <Center paddingBlockStart="1.5rem" w="100%">
      <RadioGroup
        defaultValue={population?.registeredVoter ? "Yes" : "No"}
        onChange={(e) => population?.setRegisteredVoter(() => e === "Yes")}
      >
        <HStack spacing="1.5rem">
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </HStack>
      </RadioGroup>
    </Center>
  );
}

export default RegisteredVoterFilter;
