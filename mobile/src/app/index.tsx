import { VStack } from "../components/ui/vstack";

import { Header } from "../components/header";
import { HomeAnnouncementCard } from "../components/home-announcement-card";
import { Text } from "../components/ui/text";
import { SearchBar } from "../components/search-bar";
import { ProductItem } from "../components/product-item";
import { ScrollView } from "react-native";

import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Redirect } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Loading from "../components/loading";
import ProductList from "../components/product-list";

function Home() {
  const { user } = useContext(AuthContext);

  async function logout() {
    await signOut(auth);
  }
  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <VStack className="flex-1 bg-gray-600 px-6 pt-16">
      <Header />
      <VStack className="mt-10">
        <HomeAnnouncementCard />
      </VStack>
      <Text onPress={logout} className="mb-3 mt-6 text-lg">
        Compre produtos variados
      </Text>
      <SearchBar />

      <ProductList />
    </VStack>
  );
}

export default Home;
