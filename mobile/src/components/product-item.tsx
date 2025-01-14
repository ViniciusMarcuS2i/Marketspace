import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge, BadgeText } from "./ui/badge";
import { router } from "expo-router";
import { formatCurrency } from "../utils/formatCurrency";

interface ProductItemProps {
  id: string;
  name: string;
  price: string;
  isNew: string;
  changeble: boolean;
  productImage: string;
  method: {
    dinheiro: string;
    boleto: string;
    pix: string;
  };
}

export interface ProductProps {
  product: ProductItemProps;
}

export function ProductItem({ product }: ProductProps) {
  return (
    <>
      {product && (
        <TouchableOpacity
          onPress={() => router.navigate(`/product/${product.id}` as never)}
          className="m-1 flex-1"
          activeOpacity={0.9}
        >
          <VStack>
            <ImageBackground
              source={{ uri: product.productImage }}
              resizeMode="cover"
              style={{
                height: 120,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 5,
                paddingTop: 12,
              }}
              imageClassName="rounded-lg"
            >
              <VStack>
                <Badge className="rounded-lg bg-gray-200 px-3">
                  <BadgeText
                    style={{ color: "white" }}
                    className="text-md font-heading"
                  >
                    {product.isNew}
                  </BadgeText>
                </Badge>
              </VStack>
            </ImageBackground>
            <VStack>
              <Text className="text-xl">{product.name}</Text>
              <Text className="font-heading text-xl text-black">
                {formatCurrency(Number(product.price))}
              </Text>
            </VStack>
          </VStack>
        </TouchableOpacity>
      )}
    </>
  );
}
