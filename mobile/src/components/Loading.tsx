import { Spinner } from "./ui/spinner";
import { VStack } from "./ui/vstack";
import { StatusBar } from "expo-status-bar";

function Loading() {
  return (
    <>
      <VStack className="flex-1 justify-center bg-gray-600 items-center">
        <Spinner className="text-blue" size={"large"} />
      </VStack>
      <StatusBar style="dark" translucent />
    </>
  );
}

export default Loading;
