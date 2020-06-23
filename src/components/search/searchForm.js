import React from "react";
import {
  FormControl,
  Input,
  Flex,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/core";

const SearchForm = () => {
  return (
    <Flex
      flex={1}
      alignItems="center"
      justifyContent="center"
      gridArea="Search"
    >
      <form className="flex-1">
        <FormControl width="full">
          <InputGroup>
            <Input width="full" />
            <InputRightElement width="4.5rem">
              <Button h="100%" size="sm">
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    </Flex>
  );
};

export default SearchForm;
