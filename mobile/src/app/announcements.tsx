import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HStack } from "../components/ui/hstack";
import { Text } from "../components/ui/text";
import { VStack } from "../components/ui/vstack";
import { TouchableOpacity } from "react-native";
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

function Announcements() {
  return (
    <VStack className="px-6 pt-16">
      <HStack className="items-center justify-between">
        <Text className="font-heading text-2xl">Meus anúncios</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          className="rounded-lg bg-blue-light"
        >
          <MaterialCommunityIcons name="plus" color="white" size={24} />
        </TouchableOpacity>
      </HStack>
      <HStack className="mt-12 items-center justify-between">
        <Text className="text-xl">9 anúncios</Text>

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
            <SelectContent>
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
      <VStack className="mt-8">
        <ProductItem />
      </VStack>
    </VStack>
  );
}

export default Announcements;
