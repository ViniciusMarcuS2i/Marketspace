import { Spinner } from "./ui/spinner";
import { VStack } from "./ui/vstack";

function Loading() {
  return (
    <VStack className="flex-1 items-center justify-center bg-gray-600">
      <Spinner className="text-blue" size={"large"} />
    </VStack>
  );
}

export default Loading;
