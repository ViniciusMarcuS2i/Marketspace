import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function HomeAnnouncementCard() {
  const { currentUserProducts } = useContext(AuthContext);

  return (
    <VStack className="gap-4">
      <Text className="text-[16px]">Seus produtos anunciados para venda</Text>
      <HStack className="items-center justify-between rounded-xl bg-[#dfe1ea] px-6 py-4">
        <HStack className="items-center gap-3">
          <MaterialCommunityIcons
            name="tag-outline"
            size={26}
            color="#364D9D"
          />
          <VStack>
            <Text className="font-heading text-2xl">
              {currentUserProducts.length}
            </Text>
            <Text>anúncios ativos</Text>
          </VStack>
        </HStack>
        <HStack className="items-center">
          <Text className="text-[14px] text-blue">Meus anúncios</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            color="#364D9D"
          />
        </HStack>
      </HStack>
    </VStack>
  );
}
