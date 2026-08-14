import { Tabs } from 'expo-router'
import { Calendar, Compass, Home, Info } from 'lucide-react-native'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/src/theme/colors'

/**
 * Space above Android system nav (Samsung 3-button / gesture bar).
 * Edge-to-edge draws the app under those buttons; without this pad the
 * tab icons sit under Home/Back/Recents.
 *
 * Prefer the real inset. On some Samsung devices insets.bottom is 0 even
 * when the system bar overlays — fall back to ~48dp (standard 3-button height).
 */
function useTabBarBottomInset() {
  const insets = useSafeAreaInsets()
  if (insets.bottom > 0) return insets.bottom
  if (Platform.OS === 'android') return 48
  return 10
}

export default function TabLayout() {
  const bottomPad = useTabBarBottomInset()
  // Icon + label row; bottomPad is reserved for the system nav only
  const contentHeight = 56
  const tabBarHeight = contentHeight + bottomPad

  return (
    <Tabs
      // Drive the bar's own safe-area math from our resolved inset so we
      // never double-count or get a 0 inset on edge-to-edge Android.
      safeAreaInsets={{ bottom: bottomPad }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.inkMuted,
        tabBarStyle: {
          backgroundColor: colors.surfaceElevated,
          borderTopColor: colors.border,
          height: tabBarHeight,
          paddingBottom: bottomPad,
          paddingTop: 6,
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="navigate"
        options={{
          title: 'Navigate',
          tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="programme"
        options={{
          title: 'Programme',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Info',
          tabBarIcon: ({ color, size }) => <Info size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
