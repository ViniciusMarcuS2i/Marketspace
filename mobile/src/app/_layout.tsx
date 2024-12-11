import { Slot } from "expo-router";

import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";

import "@/global.css";
import { StatusBar } from "expo-status-bar";
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import Loading from "../components/Loading";

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
      <Slot />
    </GluestackUIProvider>
  );
}

export default Layout;
