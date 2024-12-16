import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "../assets/images";
import { Button, ButtonText } from "./ui/button";
import { HStack } from "./ui/hstack";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

export function Header() {
  return (
    <HStack className="items-center justify-between">
      <HStack className="items-center gap-3">
        <Image source={Avatar} alt="Logo" size="sm" resizeMode="contain" />
        <VStack>
          <Text className="font-body text-lg">Boas vindas,</Text>
          <Text className="font-heading text-lg">Fulano</Text>
        </VStack>
      </HStack>
      <Button className="h-14 items-center rounded-lg bg-black">
        <MaterialCommunityIcons name="plus" size={20} color="white" />

        <ButtonText className="text-lg">Criar anúncio</ButtonText>
      </Button>
    </HStack>
  );
}
