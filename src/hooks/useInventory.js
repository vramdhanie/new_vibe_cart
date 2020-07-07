import { useState, useEffect } from "react";
import { COLLECTION_NAMES } from "../utilities/constants";

function useInventory(db) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const prodRef = db.collection(COLLECTION_NAMES.PRODUCTS);
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
  }, [db]);

  return { inventory };
}

export default useInventory;
