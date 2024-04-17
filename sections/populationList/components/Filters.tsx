import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { BsArrowDownShort, BsSearch } from "react-icons/bs";

interface FilterProps {
  searchFilter: string;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  residentDataLength: number;
  order: "asc" | "desc";
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  refetch: () => void;
  isFetching: boolean;
  searchBy: string;
  purokResidentCount: number | undefined;
  setSearchBy: React.Dispatch<React.SetStateAction<string>>;
  // handlePrintCurrentFilter: () => void;
}

function Filters(props: FilterProps) {
  const {
    searchFilter,
    setSearchFilter,
    residentDataLength,
    order,
    setOrder,
    refetch,
    isFetching,
    searchBy,
    setSearchBy,
    purokResidentCount,
    // handlePrintCurrentFilter,
  } = props;

  return (
    <HStack paddingBottom="1rem" justify="space-between">
      <HStack spacing="1.5rem">
        <InputGroup w="30rem">
          <Input
            p="1.6rem"
            fontFamily="inter"
            placeholder={`Search ${searchBy}...`}
            focusBorderColor="#7A6CD3"
            borderColor="rgba(0, 0, 0, .1)"
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
            onClick={refetch}
            _hover={{
              opacity: 1,
              bg: "#F4C8C2",
            }}
          >
            <BsSearch />
          </InputRightElement>
        </InputGroup>
        <HStack gap="1rem">
          <Text
            fontFamily="inter"
            fontSize=".9rem"
            fontWeight="medium"
            opacity=".7"
          >
            Search By
          </Text>
          <Select
            focusBorderColor="palette.secondary"
            opacity=".8"
            w="12.5rem"
            borderColor="rgba(0, 0, 0, .2)"
            value={searchBy}
            fontSize=".9rem"
            fontFamily="inter"
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="Last Name">Last Name</option>
            <option value="First Name">First Name</option>
            <option value="Middle Name">Middle Name</option>
          </Select>
        </HStack>
        <HStack spacing="1rem">
          <Box
            color="palette.secondary"
            fontSize="2rem"
            onClick={() => {
              if (order === "asc") {
                setOrder("desc");
              } else {
                setOrder("asc");
              }
            }}
          >
            {order === "asc" ? (
              <AiOutlineSortAscending />
            ) : (
              <AiOutlineSortDescending />
            )}
          </Box>
          {/* <Button
            fontSize=".8rem"
            p="1.2rem"
            bg="transparent"
            color="#FF6A55"
            // border="1px solid"
            borderColor="#FF6A55"
            onClick={handlePrintCurrentFilter}
          >
            Print Current Filtered Record
          </Button> */}
          {/* <Button
            fontSize=".8rem"
            p="1.2rem"
            bg="transparent"
            color="#FF6A55"
            // border="1px solid"
            borderColor="#FF6A55"
          >
            Print Complete Record
          </Button> */}
        </HStack>
      </HStack>
      <HStack spacing="1.5rem">
        <Text
          fontWeight="medium"
          fontFamily="inter"
          fontSize=".8rem"
          color="palette.secondary"
        >
          {`Total Entries: ${purokResidentCount}`}
        </Text>
      </HStack>
    </HStack>
  );
}

export default Filters;
