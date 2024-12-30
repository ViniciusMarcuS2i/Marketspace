import React from "react";
import { useEffect, useState } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { ProductItem } from "./product-item";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";
import { Text } from "./ui/text";
import { Skeleton } from "./ui/skeleton";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";

function ProductList() {
  const { width } = useWindowDimensions();
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const collectionRef = collection(firestore, "products");
    onSnapshot(collectionRef, (snapshot) => {
      const p = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(p);
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {products.length === 0 ? (
        <HStack className="gap-5">
          <VStack className="mt-6 gap-2">
            <Skeleton
              style={{ width: width / 2 - 30 }}
              className={`h-[120px]`}
            />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </VStack>
          <VStack className="mt-6 gap-2">
            <Skeleton style={{ width: width / 2 - 30 }} className="h-[120px]" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </VStack>
        </HStack>
      ) : (
        <FlatList
          numColumns={2}
          keyExtractor={(item) => item.id}
          data={products}
          contentContainerStyle={{ flexGrow: 1, paddingTop: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ProductItem product={item} />}
          ListEmptyComponent={() => (
            <Text className="text-center text-lg font-semibold">
              Nenhum produto encontrado
            </Text>
          )}
        />
      )}
    </>
  );
}

export default ProductList;
