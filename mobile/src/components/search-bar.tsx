import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";
import { HStack } from "./ui/hstack";
import { Divider } from "./ui/divider";

export function SearchBar() {
  return (
    <Input size="xl" className="h-16 rounded-lg bg-white px-4">
      <InputField className="font-body" placeholder="Buscar anúncio" />

      <HStack className="items-center">
        <MaterialCommunityIcons color="#3E3A40" name="magnify" size={24} />
        <Divider orientation="vertical" className="mx-2 h-6 bg-gray-400" />
        <InputSlot>
          <MaterialCommunityIcons
            color="#3E3A40"
            name="filter-variant"
            size={24}
          />
        </InputSlot>
      </HStack>
    </Input>
  );
}
