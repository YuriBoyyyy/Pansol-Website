import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPlusCircleDotted, BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AddNewDiscussion from "../modals/AddNewDiscussion";
import { useAuth } from "../../../context/AuthContext";

interface CompProps {
  searchFilter: string;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
}

function SearchAndNewDiscussion(props: CompProps) {
  const { searchFilter, setSearchFilter } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (auth?.currentUser) {
      onOpen();
    } else {
      navigate("/signin-first");
    }
  };

  return (
    <HStack spacing="1rem" w="100%">
      <InputGroup w="100%">
        <Input
          p="1.6rem"
          placeholder="Search for a topic..."
          focusBorderColor="#8F80E5"
          borderColor="#D9D7FF"
          _placeholder={{
            color: "#5C596E",
            opacity: ".7",
          }}
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <InputRightElement
          marginTop=".4rem"
          marginRight=".5rem"
          fontSize="1.2rem"
          color="#2B273E"
          opacity=".5"
          cursor="pointer"
          transition="all .3s ease"
          borderRadius=".5rem"
          _hover={{
            opacity: 1,
            bg: "#E6E4F6",
          }}
        >
          <BsSearch />
        </InputRightElement>
      </InputGroup>
      <Button
        p="1.7rem"
        w="15rem"
        bg="palette.button_accent_bg"
        color="palette.primary"
        _hover={{
          bg: "palette.button_accent_hover",
        }}
        rightIcon={<BsPlusCircleDotted />}
        onClick={handleClick}
      >
        New Discussion
      </Button>
      <AddNewDiscussion isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}

export default SearchAndNewDiscussion;
