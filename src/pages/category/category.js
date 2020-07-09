import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import FirebaseContext from "../../firebase/context";
import { COLLECTION_NAMES } from "../../utilities/constants";
import ProductCard from "../../components/product/productCard";
import { Grid, Box, Heading, Alert, AlertIcon, Spinner } from "@chakra-ui/core";
import Specials from "../../components/special/specials";

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    const prodRef = firebase.db.collection(COLLECTION_NAMES.PRODUCTS);
    const catRef = firebase.db.collection(COLLECTION_NAMES.CATEGORIES).doc(id);
    let mainCat = catRef;
    let subCat = null;
    catRef.get().then(async (cat) => {
      if (cat.exists) {
        const catData = cat.data();

        if (catData.parent) {
          let parent = await catData.parent.get();
          if (parent.exists) {
            mainCat = catData.parent;
            subCat = catRef;
          }
        }

        const main = prodRef
          .where("main_category", "==", mainCat)
          .limit(10)
          .get();

        let sub = null;
        if (subCat) {
          sub = prodRef.where("sub_category", "==", subCat).limit(10).get();
        }
        Promise.all([main, sub]).then(([mainSnap, subSnap]) => {
          const mainProds = mainSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const subProds = subSnap
            ? subSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            : [];

          mainProds.forEach((prod) => {
            if (!subProds.find((p) => p.id === prod.id)) {
              subProds.push(prod);
            }
          });

          setProducts(subProds);
        });
      } else {
        history.push("/");
      }
    });
  }, [id]);

  return (
    <>
      <Box p={2} mx="auto" width="92%">
        <Heading as="h3" color="primary.600">
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </Heading>

        {products ? (
          products.length ? (
            <Grid
              templateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(5, 1fr)",
              }}
              gap={6}
            >
              {products.map((product) => (
                <ProductCard {...product} key={product.id} />
              ))}
            </Grid>
          ) : (
            <Alert status="info">
              <AlertIcon />
              Sorry, no available products in this category. Try again later. Or
              shop thousands of products in other categories!
            </Alert>
          )
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="secondary.200"
            color="primary.500"
            size="xl"
          />
        )}
      </Box>
      <Specials />
    </>
  );
};

export default Category;
