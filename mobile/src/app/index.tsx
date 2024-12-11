import { Redirect } from "expo-router";

function Home() {
  return <Redirect href={"/(auth)" as any} />;
}

export default Home;
