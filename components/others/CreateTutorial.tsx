/* eslint-disable react/require-default-props */
import { Box, Button, Center, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Lottie from "react-lottie-player";
import Reactour, { CustomHelperProps, ReactourStep } from "reactour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Avatar from "../../assets/avatar.json";

interface Props {
  steps: ReactourStep[];
  body?: React.MutableRefObject<HTMLElement>;
  storageVariable: string;
}

function CreateTutorial(props: Props) {
  const { steps, storageVariable, body } = props;
  const disableBody = (target: HTMLElement) => disableBodyScroll(target);
  const enableBody = (target: HTMLElement) => enableBodyScroll(target);

  const [isTourOpen, setIsTourOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(storageVariable)) {
      setIsTourOpen(false);
    } else {
      setIsTourOpen(true);
    }
  }, [storageVariable]);

  const customHelper = ({
    content,
    gotoStep,
    current,
    totalSteps,
    close,
  }: CustomHelperProps) => {
    return (
      <Center
        borderRadius=".3rem"
        p="1rem"
        w="25rem"
        bg="#F6F5FF"
        gap="1.5rem"
        flexDir="column"
      >
        <HStack w="100%" pos="relative" justify="space-between">
          <Text
            textAlign="start"
            w="100%"
            fontSize=".9rem"
            fontFamily="inter"
          >{`${current}/${totalSteps}`}</Text>
          <Box pos="absolute" top="-1.5rem" right="-1rem">
            <Lottie
              loop
              animationData={Avatar}
              play
              style={{ width: 80, height: 80 }}
            />
          </Box>
        </HStack>
        <Text textAlign="start">{content?.toString()}</Text>
        <HStack w="100%" justify="space-between">
          <Button fontSize=".9rem" onClick={close} fontFamily="inter">
            Skip
          </Button>
          <HStack spacing="1rem">
            <Box
              fontSize="1.2rem"
              opacity=".8"
              onClick={() => gotoStep(current - 1)}
            >
              <BiArrowBack />
            </Box>
            <Button
              fontSize=".9rem"
              fontFamily="inter"
              color="palette.primary"
              bg="palette.secondary"
              _hover={{ bg: "palette.secondary_hover" }}
              onClick={() => {
                if (current + 1 === totalSteps) {
                  close();
                  localStorage.setItem(storageVariable, "true");
                } else {
                  gotoStep(current + 1);
                }
              }}
            >
              {current + 1 === totalSteps ? "Finish" : "Next"}
            </Button>
          </HStack>
        </HStack>
      </Center>
    );
  };

  return (
    <Reactour
      nextButton={
        <Button
          bg="palette.secondary"
          color="palette.primary"
          _hover={{ bg: "palette.secondary_hover" }}
        >
          Next
        </Button>
      }
      CustomHelper={customHelper}
      steps={steps}
      rounded={5}
      closeWithMask={false}
      isOpen={isTourOpen}
      disableInteraction
      onAfterOpen={disableBody}
      onBeforeClose={enableBody}
      onRequestClose={() => setIsTourOpen(false)}
      // lastStepNextButton={}
    />
  );
}

export default CreateTutorial;
