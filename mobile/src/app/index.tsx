import { useState } from "react";
import { VStack } from "../components/ui/vstack";
import { Redirect } from "expo-router";
import { Header } from "../components/header";
import { HomeAnnouncementCard } from "../components/home-announcement-card";
import { Text } from "../components/ui/text";
import { SearchBar } from "../components/search-bar";
import { ProductItem } from "../components/product-item";
import { ScrollView } from "react-native";

function Home() {
  const [isAuth, setIsAuth] = useState(true);

  if (!isAuth) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <VStack className="flex-1 bg-gray-600 px-6 pt-16">
      <Header />
      <VStack className="mt-10">
        <HomeAnnouncementCard />
      </VStack>
      <Text className="mb-3 mt-6 text-lg">Compre produtos variados</Text>
      <SearchBar />
      <ScrollView className="mt-8">
        <ProductItem />
      </ScrollView>
    </VStack>
  );
}

export default Home;
