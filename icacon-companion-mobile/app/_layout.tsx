import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { colors } from '@/src/theme/colors'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

/**
 * Splash: no preventAutoHideAsync — nothing async to wait for (no custom fonts,
 * no remote config). Native splash auto-hides on first paint = fastest path.
 * See expo-splash-screen: hide as soon as possible.
 */
export default function RootLayout() {
  return (
    <>
      {/* Default light for brown PDF header; tab screens override per page */}
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.brand },
          headerTintColor: colors.white,
          contentStyle: { backgroundColor: colors.surface },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pdf/[id]"
          options={{
            presentation: 'modal',
            title: 'PDF',
            headerShown: true,
            statusBarStyle: 'light',
          }}
        />
      </Stack>
    </>
  )
}
