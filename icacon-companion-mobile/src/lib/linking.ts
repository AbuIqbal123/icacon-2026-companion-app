import { Alert, AppState, Linking, Platform, type AppStateStatus } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import NetInfo from '@react-native-community/netinfo'
import { VENUE_MAPS } from '../data/events'
import type { MapLinks } from '../data/types'

/**
 * Open tel: / mailto:.
 * Always attempt openURL — do not gate on canOpenURL (often false on iOS).
 * Ignore rejections (user cancelled the system sheet).
 */
export async function openTel(phone: string): Promise<void> {
  const digits = phone.replace(/[^\d+]/g, '')
  if (digits.length < 5) return
  try {
    await Linking.openURL(`tel:${digits}`)
  } catch {
    // cancelled or unavailable — no alert noise
  }
}

export async function openMail(
  email: string,
  options?: { subject?: string; body?: string },
): Promise<void> {
  const trimmed = email.trim()
  if (!trimmed.includes('@')) return
  const parts: string[] = []
  if (options?.subject) {
    parts.push(`subject=${encodeURIComponent(options.subject)}`)
  }
  if (options?.body) {
    parts.push(`body=${encodeURIComponent(options.body)}`)
  }
  const url =
    parts.length > 0 ? `mailto:${trimmed}?${parts.join('&')}` : `mailto:${trimmed}`
  try {
    await Linking.openURL(url)
  } catch {
    // cancelled or unavailable
  }
}

async function ensureOnline(): Promise<boolean> {
  const net = await NetInfo.fetch()
  if (net.isConnected === false) {
    Alert.alert(
      'No internet connection',
      'This link needs a network connection. Try again when you are online.',
    )
    return false
  }
  return true
}

const browserOptions: WebBrowser.WebBrowserOpenOptions = {
  presentationStyle:
    Platform.OS === 'ios'
      ? WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET
      : WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
  // Keep Custom Tabs in the same task so returning from Maps/GMaps is reliable.
  ...(Platform.OS === 'android' ? { createTask: false, showInRecents: false } : null),
}

/**
 * Track the active openBrowserAsync promise.
 * On iOS, a second open while SFSafariViewController is still up returns
 * `{ type: 'locked' }` and nothing appears — common after Maps handoff.
 */
let activeBrowserOpen: Promise<WebBrowser.WebBrowserResult> | null = null

async function dismissInAppBrowser(): Promise<void> {
  try {
    await WebBrowser.dismissBrowser()
  } catch {
    // nothing open, or platform has no dismiss
  }
  if (activeBrowserOpen) {
    try {
      await activeBrowserOpen
    } catch {
      // ignore
    }
    activeBrowserOpen = null
  }
}

/**
 * Prefer in-app browser (Safari sheet / Chrome Custom Tab).
 * OS can still hand off to Google Maps / external browser when the page asks.
 * If the sheet is stuck (locked), dismiss + retry once; then fall back to Linking.
 */
async function openInAppBrowser(url: string): Promise<void> {
  // Clear any leftover session so rapid venue taps always open a fresh sheet.
  if (activeBrowserOpen) {
    await dismissInAppBrowser()
  }

  const run = async (): Promise<WebBrowser.WebBrowserResult> => {
    const promise = WebBrowser.openBrowserAsync(url, browserOptions)
    activeBrowserOpen = promise
    try {
      return await promise
    } finally {
      if (activeBrowserOpen === promise) {
        activeBrowserOpen = null
      }
    }
  }

  try {
    let result = await run()

    // iOS: previous SFSafariViewController still held the lock.
    if (result.type === WebBrowser.WebBrowserResultType.LOCKED) {
      await dismissInAppBrowser()
      // Brief yield so the native presenter can clear.
      await new Promise((r) => setTimeout(r, 50))
      result = await run()
    }

    if (result.type === WebBrowser.WebBrowserResultType.LOCKED) {
      await Linking.openURL(url)
    }
  } catch {
    try {
      await Linking.openURL(url)
    } catch {
      Alert.alert(
        'Unable to open link',
        'Please try again when you have a connection.',
      )
    }
  }
}

// When the user leaves for Maps and comes back, release a stuck sheet so the
// next venue tap is not locked. Do not dismiss while still backgrounded mid-open.
let appState: AppStateStatus = AppState.currentState
AppState.addEventListener('change', (next) => {
  const wasBackground =
    appState === 'background' || appState === 'inactive'
  appState = next
  if (wasBackground && next === 'active' && activeBrowserOpen) {
    // Maps / external app often leaves the in-app browser half-open.
    // Dismiss so the next open is not permanently locked.
    void dismissInAppBrowser()
  }
})

/** External https (and maps) — needs network. Prefer in-app browser. */
export async function openExternal(url: string): Promise<void> {
  if (url.startsWith('mailto:')) {
    await openMail(url.replace(/^mailto:/i, ''))
    return
  }
  if (url.startsWith('tel:')) {
    await openTel(url.replace(/^tel:/i, ''))
    return
  }

  // Native map schemes / Apple Maps URLs always leave the app (not in-app browser).
  if (
    url.startsWith('geo:') ||
    url.startsWith('maps:') ||
    url.startsWith('comgooglemaps:') ||
    isAppleMapsUrl(url)
  ) {
    if (!(await ensureOnline())) return
    try {
      await Linking.openURL(url)
    } catch {
      Alert.alert('Unable to open Maps', 'Please try again.')
    }
    return
  }

  if (!(await ensureOnline())) return

  await openInAppBrowser(url)
}

function isAppleMapsUrl(url: string): boolean {
  return (
    url.startsWith('https://maps.apple.com/') ||
    url.startsWith('http://maps.apple.com/')
  )
}

/**
 * Open a venue in a maps app.
 * On iOS, always offer Apple Maps first (App Store Design guideline 4), plus Google Maps.
 * On Android, open Google Maps directly.
 */
export function openMaps(destination: MapLinks, placeName?: string): void {
  const title = placeName ? `Open ${placeName}` : 'Open in Maps'

  if (Platform.OS === 'ios') {
    Alert.alert(title, 'Choose a maps app', [
      {
        text: 'Apple Maps',
        onPress: () => {
          void openExternal(destination.appleMapsUrl)
        },
      },
      {
        text: 'Google Maps',
        onPress: () => {
          void openExternal(destination.googleMapsUrl)
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ])
    return
  }

  void openExternal(destination.googleMapsUrl)
}

/** Pick JNMC or Lemon Tree, then open with map-app chooser on iOS. */
export function openVenuePicker(): void {
  Alert.alert('Open venue in Maps', undefined, [
    {
      text: 'JNMC (workshops · 11 Sept)',
      onPress: () => {
        openMaps(VENUE_MAPS.jnmc, 'JNMC')
      },
    },
    {
      text: 'Lemon Tree (conference · 12–13 Sept)',
      onPress: () => {
        openMaps(VENUE_MAPS.lemonTree, 'Lemon Tree')
      },
    },
    { text: 'Cancel', style: 'cancel' },
  ])
}
