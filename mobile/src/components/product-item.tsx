import { ImageBackground, TouchableOpacity } from "react-native";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Product } from "../assets/images";
import { Badge, BadgeText } from "./ui/badge";

export function ProductItem() {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <VStack>
        <ImageBackground
          source={Product}
          resizeMode="contain"
          style={{
            width: 180,
            height: 120,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            paddingTop: 6,
            borderRadius: 12,
          }}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
          </Avatar>
          <VStack>
            <Badge className="rounded-lg bg-gray-200 px-3">
              <BadgeText
                style={{ color: "white" }}
                className="font-heading text-lg"
              >
                USADO
              </BadgeText>
            </Badge>
          </VStack>
        </ImageBackground>
        <VStack>
          <Text className="text-xl">Tênis Vermelho</Text>
          <Text className="font-heading text-2xl text-black">R$ 129,90</Text>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
}
