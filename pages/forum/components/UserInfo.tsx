import { Avatar, Center, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";

function UserInfo() {
  const auth = useAuth();

  return (
    <Center>
      <VStack>
        <Avatar size="lg" src={auth?.currentUser?.photoURL || ""} />
        <Text
          textAlign="center"
          fontWeight="semibold"
          fontFamily="inter"
          fontSize=".9rem"
          color="palette.tertiary"
        >
          {auth?.currentUser?.username}
        </Text>
      </VStack>
    </Center>
  );
}

export default UserInfo;
