import { Center, Select } from "@chakra-ui/react";
import { usePopulation } from "../../../../context/ManagePopulationContext";

function VaccinationStatusFilter() {
  const population = usePopulation();
  return (
    <Center paddingBlockStart="1.5rem" w="100%">
      <Select
        onChange={(e) => population?.setVaccinationStatus(e.target.value)}
        defaultValue={
          population?.vaccinationStatus
            ? population.vaccinationStatus
            : "Select Vaccination Status"
        }
      >
        <option
          disabled
          selected
          value="Select Vaccination Status"
          style={{ fontSize: ".9rem" }}
        >
          Select Vaccination Status
        </option>
        <option value="Vaccinated">Vaccinated</option>
        <option value="Unvaccinated">Unvaccinated</option>
        <option value="First-dose">First-Dose</option>
      </Select>
    </Center>
  );
}

export default VaccinationStatusFilter;
