import { Avatar, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { BiMessageRounded } from "react-icons/bi";
import LinesEllipsis from "react-lines-ellipsis";
import { useNavigate } from "react-router-dom";

interface MessageProps {
  username: string;
  message: string;
  date: Timestamp;
  id: string;
  avatar: string;
}

function Message(props: MessageProps) {
  const { username, message, date, id, avatar } = props;
  const navigate = useNavigate();

  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      cursor="pointer"
      _hover={{ bg: "#F7F7F7" }}
      p=".8rem"
      transition="all .3s ease"
      borderRadius=".3rem"
      onClick={() => navigate(`/manage-messages/${id}`)}
    >
      <HStack>
        <Avatar name={username} src={avatar} />
        <VStack spacing={0} align="start" fontFamily="inter">
          <Text color="32F2F2F" fontSize="1rem" fontWeight="medium">
            {username}
          </Text>
          <Text color="#636363" fontWeight="normal" fontSize=".8rem">
            <LinesEllipsis
              text={message}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="words"
            />
          </Text>
        </VStack>
      </HStack>
      <VStack>
        <Text fontFamily="inter" color="#FF6A55" fontSize=".8rem">
          {moment(date.toDate()).fromNow()}
        </Text>
        <Box color="#FF6A55" fontSize="1rem">
          <BiMessageRounded />
        </Box>
      </VStack>
    </Flex>
  );
}

export default Message;
