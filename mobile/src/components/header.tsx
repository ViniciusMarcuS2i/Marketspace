import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "../assets/images";
import { Button } from "./ui/button";
import { HStack } from "./ui/hstack";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Alert } from "react-native";

export function Header() {
  const { currentUser, setCurrentUserProducts } = useContext(AuthContext);

  if (!currentUser) {
    return null;
  }

  function handleLogout() {
    Alert.alert("Sair", "Deseja sair da sua conta?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          await signOut(auth);
        },
      },
    ]);
    setCurrentUserProducts([]);
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
      <HStack className="gap-3">
        <Button
          onPress={() => router.navigate("/advertise" as any)}
          className="h-14 items-center rounded-lg bg-black"
        >
          <MaterialCommunityIcons name="plus" size={20} color="white" />
        </Button>
        <Button
          onPress={handleLogout}
          className="h-14 items-center rounded-lg bg-red-700"
        >
          <MaterialCommunityIcons name="logout" size={20} color="white" />
        </Button>
      </HStack>
    </HStack>
  );
}
