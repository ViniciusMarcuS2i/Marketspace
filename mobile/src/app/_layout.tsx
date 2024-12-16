import { Tabs } from "expo-router";

import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";

import "@/global.css";
import { StatusBar } from "expo-status-bar";
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import Loading from "../components/loading";

function Layout() {
  const [loadedfonts] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  if (!loadedfonts) {
    return <Loading />;
  }

  return (
    <GluestackUIProvider mode="light">
      <StatusBar translucent style="dark" />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen
          name="(auth)"
          options={{ tabBarItemStyle: { display: "none" } }}
        />
      </Tabs>
    </GluestackUIProvider>
  );
}

export default Layout;
