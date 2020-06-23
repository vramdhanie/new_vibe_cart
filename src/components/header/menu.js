import React from "react";
import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerFooter,
  useDisclosure,
  Box,
} from "@chakra-ui/core";
import { MdMenu } from "react-icons/md";

const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box gridArea="Menu">
      <IconButton
        variantColor="blue"
        onClick={onOpen}
        variant="outline"
        icon={MdMenu}
        _focus={{
          outline: "none",
        }}
      />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            color="secondary.50"
            backgroundColor="secondary.800"
          >
            Welcome
          </DrawerHeader>
          <DrawerCloseButton
            onClick={onClose}
            _focus={{ outline: "none" }}
            color="secondary.50"
          />
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">The footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Menu;
