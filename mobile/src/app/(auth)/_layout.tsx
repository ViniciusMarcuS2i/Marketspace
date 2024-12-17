import { AuthContext } from "@/src/context/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

function AuthLayout() {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect href="/announcements" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}

export default AuthLayout;
