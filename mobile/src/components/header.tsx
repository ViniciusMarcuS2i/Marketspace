import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "../assets/images";
import { Button, ButtonText } from "./ui/button";
import { HStack } from "./ui/hstack";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { router } from "expo-router";

export function Header() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return null;
  }

  return (
    <HStack className="items-center justify-between">
      <HStack className="items-center gap-3">
        <Image
          className="rounded-full border-2 border-blue-light"
          source={!currentUser.avatar ? Avatar : { uri: currentUser.avatar }}
          alt="Logo"
          size="sm"
          resizeMode="contain"
        />
        <VStack>
          <Text className="font-body text-lg">Boas vindas,</Text>
          <Text className="font-heading text-lg">
            {currentUser.name.split(" ")[0]}
          </Text>
        </VStack>
      </HStack>
      <Button className="h-14 items-center rounded-lg bg-black">
        <MaterialCommunityIcons name="plus" size={20} color="white" />

        <ButtonText
          onPress={() => router.navigate("/advertise" as any)}
          className="text-lg"
        >
          Criar anúncio
        </ButtonText>
      </Button>
    </HStack>
  );
}
