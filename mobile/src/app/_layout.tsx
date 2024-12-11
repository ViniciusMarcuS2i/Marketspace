import { Slot } from "expo-router";

import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";

import "@/global.css";
import { StatusBar } from "expo-status-bar";

function Layout() {
  return (
    <GluestackUIProvider mode="light">
      <StatusBar translucent style="dark" />
      <Slot />
    </GluestackUIProvider>
  );
}

export default Layout;
