import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../../firebase/context";
import { COLLECTION_NAMES } from "../../utilities/constants";
import ProductCard from "../../components/product/productCard";
import { Box, Heading } from "@chakra-ui/core";

const Specials = () => {
  const [inventory, setInventory] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const prodRef = firebase.db.collection(COLLECTION_NAMES.PRODUCTS);
    prodRef
      .where("special", "==", true)
      .limit(10)
      .get()
      .then((snapshot) =>
        setInventory(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );
  }, [firebase]);

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
