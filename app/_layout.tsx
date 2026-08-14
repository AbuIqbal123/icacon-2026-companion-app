import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as Updates from 'expo-updates'
import { colors } from '@/src/theme/colors'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

/**
 * App Store / production: fetch OTA as soon as possible and reload once ready.
 * Without an explicit reload, ON_LOAD can leave users on the embedded (old) bundle
 * until a second cold start — easy to miss for PDF asset updates.
 */
function useApplyOtaUpdate() {
  useEffect(() => {
    if (__DEV__) return
    let cancelled = false
    ;(async () => {
      try {
        const check = await Updates.checkForUpdateAsync()
        if (cancelled || !check.isAvailable) return
        await Updates.fetchUpdateAsync()
        if (cancelled) return
        await Updates.reloadAsync()
      } catch {
        // Offline or update service unavailable — keep embedded / last good bundle
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])
}

/**
 * Splash: no preventAutoHideAsync — nothing async to wait for (no custom fonts,
 * no remote config). Native splash auto-hides on first paint = fastest path.
 * See expo-splash-screen: hide as soon as possible.
 */
export default function RootLayout() {
  useApplyOtaUpdate()

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
