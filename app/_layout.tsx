import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Animated from "react-native-reanimated";
import { PlusIcon, PencilIcon } from "lucide-react-native";

import "../global.css";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(home)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(home)"
          options={{
            title: "Blog List",
            headerTitleAlign: "center",
            headerRight: () => {
              return (
                <Link href="/create">
                  <Animated.View className="p-4 cursor-pointer">
                    <PlusIcon
                      size={27}
                      color={"black"}
                      className="w-[27] h-[27]"
                    />
                  </Animated.View>
                </Link>
              );
            },
          }}
        />
        <Stack.Screen
          name="show"
          options={{
            title: "Blog Details",
            headerTitleAlign: "center",
            headerRight: () => {
              return (
                <Link href="/edit">
                  <Animated.View className="p-4 cursor-pointer">
                    <PencilIcon
                      size={25}
                      color={"black"}
                      className="w-[25] h-[25]"
                    />
                  </Animated.View>
                </Link>
              );
            },
          }}
        />
        <Stack.Screen
          name="create"
          options={{ title: "Create Blog", headerTitleAlign: "center" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
