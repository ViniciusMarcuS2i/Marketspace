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
import { AuthProvider } from "../context/authContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
      <AuthProvider>
        <StatusBar translucent style="dark" />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { height: 70, paddingTop: 15 },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  color={focused ? "#647AC7" : "#9F9BA1"}
                  size={24}

                />
              ),
            }}
          />

          <Tabs.Screen
            name="announcements"
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "pricetags" : "pricetags-outline"}
                  color={focused ? "#647AC7" : "#9F9BA1"}
                  size={24}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="(auth)"
            options={{
              tabBarItemStyle: { display: "none" },
              tabBarStyle: { display: "none" },
            }}
          />
          <Tabs.Screen
            name="product/[id]"
            options={{
              tabBarItemStyle: { display: "none" },
              tabBarStyle: { display: "none" },
            }}
          />
          <Tabs.Screen
            name="advertise/index"
            options={{
              tabBarStyle: { display: "none" },
              tabBarItemStyle: { display: "none" },
            }}
          />
        </Tabs>
      </AuthProvider>
    </GluestackUIProvider>
  );
}

export default Layout;
