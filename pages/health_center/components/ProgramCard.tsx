import { Box, Flex, Text, VStack, WrapItem } from "@chakra-ui/react";
import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { useNavigate } from "react-router-dom";
import { ProgramModel } from "../../../utils/interfaces/AppInterfaces";

interface ProgramProps {
  programData: ProgramModel;
}

function ProgramCard(props: ProgramProps) {
  const { programData } = props;
  const navigate = useNavigate();

  return (
    <WrapItem>
      <VStack
        boxShadow="1px 1px 16px rgba(0, 0, 0, .1)"
        w="22rem"
        p="1.5rem"
        bg="#F6F5FF"
        h="20rem"
        justify="center"
        align="start"
        gap="1rem"
        borderRadius=".5rem"
      >
        <Text flex={2} fontWeight="bold" fontSize="1.2rem" fontFamily="inter">
          {programData.programData.title}
        </Text>
        <Text flex={3} fontWeight="light">
          <LinesEllipsis
            text={programData.programData.details}
            maxLine="5"
            ellipsis="..."
            trimRight
            basedOn="words"
          />
        </Text>
        <Flex alignSelf="end" flex={1}>
          <Text
            bg="transparent"
            fontWeight="semibold"
            fontFamily="inter"
            color="palette.secondary"
            cursor="pointer"
            onClick={() => navigate(programData.id)}
            _hover={{}}
          >
            More Details
          </Text>
        </Flex>
      </VStack>
    </WrapItem>
  );
}

export default ProgramCard;
