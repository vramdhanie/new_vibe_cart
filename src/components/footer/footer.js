import React from "react";
import { Flex } from "@chakra-ui/core";

const Footer = () => {
  return (
    <Flex
      as="footer"
      color="primary.700"
      justifyContent="center"
      py={2}
      borderTop="solid"
      borderTopColor="secondary.400"
      borderTopWidth={1}
      fontSize="sm"
    >
      &copy; {new Date().getFullYear()} New Vibe Limited
    </Flex>
  );
};

export default Footer;
