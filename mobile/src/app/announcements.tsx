import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HStack } from "../components/ui/hstack";
import { Text } from "../components/ui/text";
import { VStack } from "../components/ui/vstack";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../components/ui/select";
import { ChevronDownIcon } from "../components/ui/icon";
import { ProductItem } from "../components/product-item";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Redirect, router } from "expo-router";
import { Spinner } from "../components/ui/spinner";

function Announcements() {
  const { user, currentUserProducts } = useContext(AuthContext);

  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <VStack className="px-6 pt-16">
      <HStack className="items-center justify-between">
        <Text className="font-heading text-2xl">Meus anúncios</Text>
        <TouchableOpacity
          onPress={() => router.navigate("/advertise")}
          activeOpacity={0.8}
          className="rounded-lg bg-gray-100"
        >
          <MaterialCommunityIcons name="plus" color="white" size={24} />
        </TouchableOpacity>
      </HStack>
      <HStack className="mt-12 items-center justify-between">
        <Text className="text-xl">{currentUserProducts.length} anúncios</Text>

        <Select className="items-center">
          <SelectTrigger variant="outline" className="px-2" size="lg">
            <SelectInput
              className="w-30 font-body text-lg"
              placeholder="Select option"
            />
            <SelectIcon as={ChevronDownIcon} size="md" />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent className="pb-4">
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Todos" value="all" />
              <SelectItem label="USADOS" value="new" />
              <SelectItem label="NOVOS" value="used" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={currentUserProducts}
        contentContainerStyle={{ flexGrow: 1, marginTop: 24 }}
        renderItem={({ item }) => <ProductItem product={item} />}
        ListEmptyComponent={() => (
          <Spinner size="small" className="color-blue" />
        )}
      />
    </VStack>
  );
}

export default Announcements;
