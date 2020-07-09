import React, { useContext } from "react";
import InventoryContext from "../../data/inventoryContext";
import { useToast, Text, Heading, Box, Flex } from "@chakra-ui/core";
import { titleCase } from "../../utilities/textFunctions";

const ProductCard = ({
  name,
  description,
  image,
  price,
  id,
  main_category,
  sub_category,
}) => {
  const toast = useToast();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { addItem, quantityOfItemInCart } = useContext(InventoryContext);

  const handleAddToCart = () => {
    const item = { id, name, description, image, price };
    addItem(item)
      .then(() => {
        toast({
          title: !!quantity ? "One more added!" : "One added!",
          description: `1 of ${name} added to cart. (${quantity + 1} in cart)`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Sorry",
          description:
            "We were not able to add the item to the cart. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const quantity = quantityOfItemInCart(id);

  return (
    <Flex
      maxWidth="xs"
      width="100%"
      borderRadius="4px"
      overflow="hidden"
      mx="auto"
      flexDirection="column"
      boxShadow="0 1px 3px 0 rgba(0,0,0,0.2)"
      position="relative"
    >
      {!!quantity && (
        <Box
          bg="gray.300"
          p={1}
          color="primary.300"
          borderTopRightRadius="4px"
          borderBottomLeftRadius="4px"
          position="absolute"
          top={0}
          fontSize="xs"
          right={0}
        >
          {quantity} in cart
        </Box>
      )}
      <div className="flex md:flex-col flex-1">
        <div className="flex-1 py-4">
          <img src={image} alt={description} className="w-9/12 my-0 mx-auto" />
        </div>
        <div className="px-2 py-4 flex-1 md:px-6">
          <Heading as="h5" mb={2} color="primary.700" fontSize="lg">
            {name}
          </Heading>
          <Text fontSize="xs" color="primary.300">
            {titleCase(main_category.id)}
            {sub_category ? `/${titleCase(sub_category.id)}` : ""}
          </Text>
          <Text color="primary.700" fontSize="sm">
            {description}
          </Text>
        </div>
      </div>
      <div className="px-4 py-4 flex justify-between items-center">
        <div className="text-lg text-red-400 font-bold">
          {formatter.format(price)}
        </div>
        <button
          className="flex-shrink-0 border-teal-500 hover:bg-teal-700  hover-text-white bg-white hover:border-teal-700 text-sm border text-teal-500 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleAddToCart}
        >
          {!!quantity ? "Add one more" : "Add to cart"}
        </button>
      </div>
    </Flex>
  );
};

export default ProductCard;
