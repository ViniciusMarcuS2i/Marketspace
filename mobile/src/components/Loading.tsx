import { Spinner } from "./ui/spinner";
import { VStack } from "./ui/vstack";

export function Loading() {
  return (
    <VStack className="flex-1 items-center justify-center bg-gray-600">
      <Spinner className="text-blue" size={"small"} />
    </VStack>
  );
}
