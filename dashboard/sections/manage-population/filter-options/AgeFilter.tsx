/* eslint-disable no-nested-ternary */
import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { usePopulation } from "../../../../context/ManagePopulationContext";

function AgeFilter() {
  const population = usePopulation();

  const options = ["Range", "Exact", "Less than", "Greater than"];

  return (
    <Box>
      <HStack justify="center" p="1rem">
        {options.map((item) => {
          return (
            <Button
              onClick={() => population?.setSelectedAgeFilterType(item)}
              bg={
                item === population?.selectedAgeFilterType
                  ? "red.400"
                  : "gray.100"
              }
              color={item === population?.selectedAgeFilterType ? "white" : ""}
              _hover={{ opacity: 0.9 }}
              key={item}
              fontFamily="inter"
              fontSize=".9rem"
            >
              {item}
            </Button>
          );
        })}
      </HStack>
      {population?.selectedAgeFilterType === "Range" ? (
        <HStack paddingBlockStart="1.5rem">
          <Input
            type="number"
            placeholder="From"
            onChange={(e) =>
              population?.setLowerRange(parseInt(e.target.value, 10))
            }
          />
          <Box fontSize="1.5rem">
            <BsArrowRightShort />
          </Box>
          <Input
            type="number"
            placeholder="To"
            onChange={(e) =>
              population?.setHigherRange(parseInt(e.target.value, 10))
            }
          />
        </HStack>
      ) : population?.selectedAgeFilterType === "Exact" ? (
        <Input
          type="number"
          placeholder="Age"
          onChange={(e) =>
            population?.setExactAge(parseInt(e.target.value, 10))
          }
        />
      ) : population?.selectedAgeFilterType === "Less than" ? (
        <Input
          type="number"
          placeholder="Less than age"
          onChange={(e) =>
            population?.setAgeLessThan(parseInt(e.target.value, 10))
          }
        />
      ) : population?.selectedAgeFilterType === "Greater than" ? (
        <Input
          type="number"
          placeholder="Greater than age"
          onChange={(e) =>
            population?.setAgeGreaterThan(parseInt(e.target.value, 10))
          }
        />
      ) : null}
    </Box>
  );
}

export default AgeFilter;
