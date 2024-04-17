import { Center, Select } from "@chakra-ui/react";
import { usePopulation } from "../../../../context/ManagePopulationContext";

function CivilStatusFilter() {
  const population = usePopulation();
  return (
    <Center paddingBlockStart="1.5rem" w="100%">
      <Select
        onChange={(e) => population?.setStatus(e.target.value)}
        defaultValue={population?.status ? population.status : "Select Status"}
      >
        <option
          disabled
          selected
          value="Select Status"
          style={{ fontSize: ".9rem" }}
        >
          Select Status
        </option>
        <option value="Single">Single</option>
        <option value="Engaged">Engaged</option>
        <option value="Married">Married</option>
        <option value="Widowed">Widowed</option>
        <option value="Divorced">Divorced</option>
      </Select>
    </Center>
  );
}

export default CivilStatusFilter;
