import React, { useContext } from "react";
import { withRouter, NavLink, useHistory, useLocation } from "react-router-dom";
import { MdShoppingCart, MdHome } from "react-icons/md";
import logo from "../../images/logo_white.png";
import { FirebaseContext } from "../../firebase";
import InventoryContext from "../../data/inventoryContext";
import {
  Flex,
  Tag,
  Link,
  TagLabel,
  Divider,
  Grid,
  Box,
  Text,
  Button,
} from "@chakra-ui/core";
import SearchForm from "../search/searchForm";
import Menu from "./menu";

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const { cart } = useContext(InventoryContext);
  const history = useHistory();
  const location = useLocation();

  return (
    <Grid
      as="header"
      justify="space-between"
      p={1}
      borderBottom="solid"
      borderBottomColor="primary.50"
      borderBottomWidth={1}
      bg="primary.800"
      alignItems="center"
      templateAreas={{
        base: `"Menu Logo Cart" "Search Search Search"`,
        md: `"Menu Logo Search Cart"`,
      }}
      templateColumns={{ md: "auto auto 1fr auto" }}
    >
      <Menu />
      <Box className="flex items-center" gridArea="Logo">
        <NavLink to="/" className="p-1">
          <img src={logo} className="w-32" alt="new vibe logo" />
        </NavLink>
      </Box>
      <SearchForm />
      <Flex gridArea="Cart" alignItems="center" justifyContent="flex-end">
        <Link
          as={NavLink}
          to="/cart"
          textDecoration="none"
          _focus={{ outline: "none" }}
          _active={{ boxShadow: "0 0 2px 3px rgba(255, 255, 255, 0.4)" }}
        >
          <Tag
            bg="none"
            color="primary.100"
            _hover={{ color: "primary.300", textDecoration: "none" }}
            position="relative"
            outline="none"
          >
            <MdShoppingCart />
            <TagLabel mx={2}>Cart</TagLabel>
            <Tag
              size="sm"
              rounded="full"
              variant="solid"
              variantColor="secondary"
              textDecoration="none"
              position="absolute"
              top="-10px"
              right="-2px"
            >
              {cart.length}
            </Tag>
          </Tag>
        </Link>
        <Divider
          px={1}
          orientation="vertical"
          borderColor="black"
          borderWidth={1}
        />
        {user ? (
          <>
            <Text color="secondary.300">{user.displayName}</Text>
            <Divider px={1} orientation="vertical" borderColor="primary.100" />
            <Button
              variant="link"
              color="secondary.300"
              _hover={{
                color: "primary.200",
              }}
              onClick={() => {
                firebase.logout();
                history.push("/");
              }}
            >
              logout
            </Button>
          </>
        ) : !location.pathname.startsWith("/login") ? (
          <Link
            as={NavLink}
            to={`/login${location.pathname}`}
            p={2}
            color="primary.100"
            _hover={{ color: "primary.300" }}
          >
            Login
          </Link>
        ) : (
          <NavLink to="/" className="p-1 hover:text-teal-500 text-blue-800">
            <MdHome />
          </NavLink>
        )}
      </Flex>
    </Grid>
  );
};

export default withRouter(Header);
