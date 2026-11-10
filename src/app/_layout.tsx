import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  Redirect,
  useSegments,
} from "expo-router";
import { useColorScheme, View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authStore } from "@features/auth/stores/Auth.store";
// import { AnimatedSplashOverlay } from "@/shared/ui/AnimatedIcon/animated-icon";

export default observer(function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 минута
            retry: (failureCount, error: any) => {
              const status = error?.response?.status;
              if (status === 401 || status === 403) return false;
              return failureCount < 3;
            },
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  useEffect(() => {
    authStore.initialize();
  }, []);

  if (!authStore.isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isAuthGroup = segments[0] === "(tabs)";
  const isAuthScreen = segments[0] === "login" || segments[0] === "register";

  if (!authStore.isAuthenticated && isAuthGroup) {
    return <Redirect href="/login" />;
  }

  if (authStore.isAuthenticated && isAuthScreen) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <AnimatedSplashOverlay /> */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />

            <Stack.Screen name="login" />
            <Stack.Screen name="register" />

            <Stack.Screen
              name="modal"
              options={{
                presentation: "transparentModal",
                headerShown: false,
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
});
