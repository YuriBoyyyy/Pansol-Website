import { Center, Select } from "@chakra-ui/react";
import { usePopulation } from "../../../../context/ManagePopulationContext";

function ReligionFilter() {
  const population = usePopulation();
  return (
    <Center paddingBlockStart="1.5rem" w="100%">
      <Select
        onChange={(e) => population?.setSelectedReligion(e.target.value)}
        defaultValue={
          population?.selectedReligion
            ? population.selectedReligion
            : "Select Religion"
        }
      >
        <option
          disabled
          selected
          value="Select Religion"
          style={{ fontSize: ".9rem" }}
        >
          Select Religion
        </option>
        <option value="Catholic">Catholic</option>
        <option value="Iglesia ni Cristo">Iglesia ni Cristo</option>
        <option value="Baptist">Baptist</option>
        <option value="Born Again">Born Again</option>
        <option value="Seventh Day Adventist">Seventh Day Adventist</option>
      </Select>
    </Center>
  );
}

export default ReligionFilter;
