import { Slot } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

function Layout() {
  return <GluestackUIProvider mode="light"><Slot /></GluestackUIProvider>;
}

export default Layout;
