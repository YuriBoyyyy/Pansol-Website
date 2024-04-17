/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePopulation } from "../../../../context/ManagePopulationContext";
import AgeFilter from "../filter-options/AgeFilter";
import CivilStatusFilter from "../filter-options/CivilStatusFilter";
import PurokFilter from "../filter-options/PurokFilter";
import ReligionFilter from "../filter-options/ReligionFilter";
import SexFilter from "../filter-options/SexFilter";
import VaccinationStatusFilter from "../filter-options/VaccinationStatusFilter";
import RegisteredVoterFilter from "../filter-options/RegisteredVoterFilter";

interface CustomFilterProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  isFetching: boolean;
}

function CustomFilter(props: CustomFilterProps) {
  const { isOpen, onClose, refetch, isFetching } = props;
  const population = usePopulation();

  // useEffect(() => {
  //   if (!isFetching) onClose();
  // }, [isFetching, onClose]);

  return (
    <Modal isCentered preserveScrollBarGap isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Custom Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%" align="start">
            <Text>Filter by:</Text>
            <Select
              defaultValue={
                population?.selectedFieldName
                  ? population.selectedFieldName
                  : "Select Field"
              }
              onChange={(e) => population?.setSelectedFieldName(e.target.value)}
            >
              <option
                disabled
                selected
                value="Select Field"
                style={{ fontSize: ".9rem" }}
              >
                Select Field
              </option>
              <option value="age">Age</option>
              <option value="gender">Sex</option>
              <option value="status">Civil Status</option>
              <option value="religion">Religion</option>
              <option value="purok">Purok</option>
              <option value="vaccination_status">Vaccination Status</option>
            </Select>
          </VStack>
          {population?.selectedFieldName === "age" ? (
            <AgeFilter />
          ) : population?.selectedFieldName === "gender" ? (
            <SexFilter />
          ) : population?.selectedFieldName === "status" ? (
            <CivilStatusFilter />
          ) : population?.selectedFieldName === "religion" ? (
            <ReligionFilter />
          ) : population?.selectedFieldName === "purok" ? (
            <PurokFilter />
          ) : population?.selectedFieldName === "vaccination_status" ? (
            <VaccinationStatusFilter />
          ) : null}
        </ModalBody>
        <Divider paddingBlock="1rem" />
        <ModalFooter>
          <Button
            onClick={refetch}
            fontFamily="inter"
            color="white"
            bg="#FF6A55"
            isLoading={isFetching}
            loadingText="Filtering"
            _hover={{
              opacity: 0.9,
            }}
          >
            Filter Data
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomFilter;
