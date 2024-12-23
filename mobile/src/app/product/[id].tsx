import React from "react";
import { useEffect, useState } from "react";
import { firestore } from "@/firebaseConfig";
import Loading from "@/src/components/loading";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge, BadgeText } from "@/src/components/ui/badge";
import { Button, ButtonText } from "@/src/components/ui/button";
import { HStack } from "@/src/components/ui/hstack";
import { Image } from "@/src/components/ui/image";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { ScrollView, TouchableOpacity } from "react-native";

function Product() {
  const params = useLocalSearchParams();
  const [product, setProduct] = useState<any>();
  const [isFetching, setIsFetching] = useState(false);

  async function fetchProduct() {
    try {
      setIsFetching(true);
      const collectionRef = collection(firestore, "products");
      await getDocs(collectionRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === params.id) {
            setProduct(doc.data());
          }
        });
      });
      const userItemOwner = product.userId;
      await getDoc(userItemOwner).then((doc) => {
        setProduct((prev: any) => ({
          ...prev,
          user: doc.data(),
        }));
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    console.log(product);
  }, [product]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <>
      {product && (
        <>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <VStack className="flex-1 pt-[70px]">
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
                <HStack className="items-center gap-2">
                  <Avatar size="sm">
                    <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                    <AvatarImage
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    />
                  </Avatar>
                  <Text className="text-xl text-gray-100">
                    {product.user && product.user.name}
                  </Text>
                </HStack>
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
          <HStack className="fixed bottom-0 w-full items-center justify-between bg-white px-6 py-6">
            <Text className="font-heading text-3xl text-blue-light">
              {formatCurrency(product.price)}
            </Text>
            <Button size="xl" className="bg-blue-light">
              <ButtonText>Entrar em contato</ButtonText>
            </Button>
          </HStack>
        </>
      )}
    </>
  );
}

export default Product;
