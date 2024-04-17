import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

interface FilterProps {
  searchFilter: string;
  searchBy: string;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
}

function SearchFilter(props: FilterProps) {
  const { searchFilter, setSearchFilter, searchBy } = props;
  return (
    <InputGroup w="30rem">
      <Input
        p="1.6rem"
        fontFamily="inter"
        placeholder={`Search ${searchBy}...`}
        focusBorderColor="#FFC0B8"
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
        _hover={{
          opacity: 1,
          bg: "#F4C8C2",
        }}
      >
        <BsSearch />
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchFilter;
