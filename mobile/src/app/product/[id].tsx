import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { firestore } from "@/firebaseConfig";
import Loading from "@/src/components/loading";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge, BadgeText } from "@/src/components/ui/badge";
import { Button, ButtonIcon, ButtonText } from "@/src/components/ui/button";
import { HStack } from "@/src/components/ui/hstack";
import { Image } from "@/src/components/ui/image";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { AuthContext } from "@/src/context/authContext";

function Product() {
  const { currentUser } = useContext(AuthContext);

  const params = useLocalSearchParams();
  const [product, setProduct] = useState<any>();
  const [productOwner, setProductOwner] = useState<any>();
  const [isFetching, setIsFetching] = useState(false);

  async function fetchProduct() {
    try {
      setIsFetching(true);
      const collectionRef = collection(firestore, "products");
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc) => {
        if (doc.id === params.id) {
          setProduct(doc.data());
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }

  async function fetchProductOwner() {
    try {
      if (!product) return;
      const docRef = doc(firestore, "users", product.userId.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProductOwner({
          id: docSnap.id,
          ...docSnap.data(),
        });
      } else {
        console.log("Sem documento!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteProduct() {
    try {
      const productRef = doc(firestore, "products", `${params.id}`);
      await deleteDoc(productRef);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    fetchProductOwner();
  }, [product]);

  if (!productOwner || isFetching) {
    return <Loading />;
  }

  return (
    <>
      {product && (
        <>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <VStack className="flex-1 pt-[60px]">
              <HStack className="px-6">
                <TouchableOpacity onPress={() => router.back()}>
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={22}
                    color="#1A181B"
                  />
                </TouchableOpacity>
              </HStack>
              <Image
                className="mt-4 h-80 w-full"
                resizeMode="cover"
                source={{ uri: product.productImage }}
                alt="product"
              />
              <VStack className="mt-4 px-6">
                <HStack>
                  <Badge className="mt-4 rounded-full bg-gray-500 px-4">
                    <BadgeText className="font-heading text-sm">
                      {product.isNew}
                    </BadgeText>
                  </Badge>
                </HStack>
                <HStack className="mt-4 justify-between">
                  <Text className="font-heading text-2xl text-gray-100">
                    {product.name}
                  </Text>
                  <Text className="font-heading text-2xl text-blue-light">
                    {formatCurrency(product.price)}
                  </Text>
                </HStack>
                <Text className="mt-4 text-xl">{product.description}</Text>
                <HStack className="mt-4 items-center gap-2">
                  <Text className="font-heading text-xl">Aceita troca?</Text>
                  {product.changleble === true ? (
                    <Text className="text-xl">Sim</Text>
                  ) : (
                    <Text className="text-xl">Não</Text>
                  )}
                </HStack>
                <VStack className="mb-3 mt-4">
                  <Text className="mb-2 font-heading text-xl">
                    Meios de pagamento:
                  </Text>
                  {product.method.map((item) => (
                    <HStack>
                      <Text key={item.id} className="text-xl">
                        {item}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </VStack>
          </ScrollView>

          {productOwner && productOwner.id === currentUser?.id ? (
            <>
              <VStack className="fixed bottom-0 w-full items-center justify-between gap-3 bg-white px-6 py-6">
                <Button size="xl" className="w-full bg-black">
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={20}
                    color={"#fff"}
                  />
                  <ButtonText className="text-lg">Editar anúncio</ButtonText>
                </Button>
                <Button
                  onPress={handleDeleteProduct}
                  size="xl"
                  className="w-full bg-red-500"
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={20}
                    color={"#fff"}
                  />
                  <ButtonText className="text-lg">Excluir anúncio</ButtonText>
                </Button>
              </VStack>
            </>
          ) : (
            <>
              <HStack className="fixed bottom-0 w-full items-center justify-between gap-3 bg-white px-6 py-6">
                <Text className="font-heading text-3xl text-blue-light">
                  {formatCurrency(product.price)}
                </Text>
                <Button
                  onPress={handleDeleteProduct}
                  size="xl"
                  className="bg-blue-light"
                >
                  <ButtonText>Entrar em contato</ButtonText>
                </Button>
              </HStack>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Product;
