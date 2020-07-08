import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import FirebaseContext from "../../firebase/context";
import { COLLECTION_NAMES } from "../../utilities/constants";
import ProductCard from "../../components/product/productCard";
import { Grid, Box, Heading } from "@chakra-ui/core";

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const prodRef = firebase.db.collection(COLLECTION_NAMES.PRODUCTS);
    const catRef = firebase.db.collection(COLLECTION_NAMES.CATEGORIES).doc(id);

    prodRef
      .where("main_category", "==", catRef)
      .limit(10)
      .get()
      .then((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  }, [id]);

  return (
    <Box p={2} mx="auto" width="92%">
      <Heading>{id.charAt(0).toUpperCase() + id.slice(1)}</Heading>
      <Grid
        templateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {products
          ? products.length
            ? products.map((product) => (
                <ProductCard {...product} key={product.id} />
              ))
            : "Sorry, no available products in this category. Try again later."
          : "Loading"}
      </Grid>
    </Box>
  );
};

export default Category;
