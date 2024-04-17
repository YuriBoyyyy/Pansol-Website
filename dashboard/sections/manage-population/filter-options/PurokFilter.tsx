import { Center, Select } from "@chakra-ui/react";
import { usePopulation } from "../../../../context/ManagePopulationContext";

function PurokFilter() {
  const population = usePopulation();
  return (
    <Center paddingBlockStart="1.5rem" w="100%">
      <Select
        onChange={(e) => population?.setSelectedPurok(e.target.value)}
        value={
          population?.selectedPurok ? population.selectedPurok : "Select Purok"
        }
      >
        <option
          disabled
          selected
          value="Select Purok"
          style={{ fontSize: ".9rem" }}
        >
          Select Purok
        </option>
        <option value="Beach A">Beach A</option>
        <option value="Beach B">Beach B</option>
        <option value="Riverside A">Riverside A</option>
        <option value="Riverside B">Riverside B</option>
        <option value="Oriental A">Oriental A</option>
        <option value="Oriental B">Oriental B</option>
        <option value="Central">Central</option>
      </Select>
    </Center>
  );
}

export default PurokFilter;
