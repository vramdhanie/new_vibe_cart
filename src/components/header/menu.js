import React, { useContext, useEffect, useState } from "react";
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
  Button,
  Stack,
} from "@chakra-ui/core";
import { MdMenu } from "react-icons/md";
import FirebaseContext from "../../firebase/context";
import { COLLECTION_NAMES } from "../../utilities/constants";
import { Link } from "react-router-dom";

const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firebase } = useContext(FirebaseContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const catRef = firebase.db.collection(COLLECTION_NAMES.CATEGORIES);
    catRef.get().then((snapshot) => {
      setCategories(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

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
            Product Filter
          </DrawerHeader>
          <DrawerCloseButton
            onClick={onClose}
            _focus={{ outline: "none" }}
            color="secondary.50"
          />
          <DrawerBody>
            <Stack alignItems="start">
              {categories.length
                ? categories.map((cat) => (
                    <Button
                      as={Link}
                      to={`/category/${cat.id}`}
                      key={cat.id}
                      variant="link"
                    >
                      {cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}
                    </Button>
                  ))
                : "Loading..."}
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">The footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Menu;
