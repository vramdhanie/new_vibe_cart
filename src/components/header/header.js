import React, { useContext } from "react";
import { withRouter, NavLink, useHistory, useLocation } from "react-router-dom";
import { MdShoppingCart, MdHome } from "react-icons/md";
import logo from "../../images/logo_white.png";
import { FirebaseContext } from "../../firebase";
import InventoryContext from "../../data/inventoryContext";
import { Flex, Tag, Link, TagLabel, Divider } from "@chakra-ui/core";
import SearchForm from "../search/searchForm";
import Menu from "./menu";

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const { cart } = useContext(InventoryContext);
  const history = useHistory();
  const location = useLocation();

  return (
    <Flex
      as="header"
      justify="space-between"
      p={1}
      borderBottom="solid"
      borderBottomColor="primary.50"
      borderBottomWidth={1}
      bg="primary.800"
      alignItems="center"
    >
      <Menu />
      <div className="flex items-center">
        <NavLink to="/" className="p-1">
          <img src={logo} className="w-32" alt="new vibe logo" />
        </NavLink>
      </div>
      <SearchForm />
      <div className="flex items-center">
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
            <div>{user.displayName}</div>
            <Divider px={1} orientation="vertical" borderColor="primary.100" />
            <div
              className="cursor-pointer hover:text-teal-500 text-blue-800"
              onClick={() => {
                firebase.logout();
                history.push("/");
              }}
            >
              logout
            </div>
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
      </div>
    </Flex>
  );
};

export default withRouter(Header);
