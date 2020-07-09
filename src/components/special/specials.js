import React, { useContext } from "react";
import InventoryContext from "../../data/inventoryContext";

import ProductCard from "../../components/product/productCard";
import { Box, Heading } from "@chakra-ui/core";

const Specials = () => {
  const { inventory } = useContext(InventoryContext);
  return (
    <Box width="92%" p={2} mx="auto">
      <Heading as="h3" color="primary.600">
        Specials
      </Heading>
      <div className="my-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 row-gap-3 col-gap-3">
        {inventory.length
          ? inventory.map((product) => (
              <ProductCard {...product} key={product.id} />
            ))
          : "Loading..."}
      </div>
    </Box>
  );
};

export default Specials;
