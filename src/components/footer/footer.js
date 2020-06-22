import React from "react";
import { Flex } from "@chakra-ui/core";

const Footer = () => {
  return (
    <Flex
      as="footer"
      color="primary.300"
      justifyContent="center"
      py={2}
      borderTop="solid"
      borderTopColor="primary.100"
      borderTopWidth={1}
      fontSize="xs"
      bg="primary.800"
    >
      &copy; {new Date().getFullYear()} New Vibe Limited
    </Flex>
  );
};

export default Footer;
