import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ProductItem } from "./product-item";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { Spinner } from "./ui/spinner";

function ProductList() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const collectionRef = collection(firestore, "products");
    const { docs } = await getDocs(collectionRef);
    const p = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(p);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <FlatList
      numColumns={2}
      keyExtractor={(item) => item.id}
      data={products}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 12 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ProductItem product={item} />}
      ListEmptyComponent={() => (
        <Spinner size="small" className="mt-3 color-blue" />
      )}
    />
  );
}

export default ProductList;
