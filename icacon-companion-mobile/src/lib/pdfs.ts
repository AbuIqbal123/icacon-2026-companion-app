import { Alert, Platform } from 'react-native'
import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system/legacy'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Sharing from 'expo-sharing'
import type { PdfId } from '../data/types'
import { PDF_ASSETS } from '../data/events'

/** Intent.FLAG_GRANT_READ_URI_PERMISSION */
const FLAG_GRANT_READ_URI_PERMISSION = 1
/** Intent.FLAG_ACTIVITY_NEW_TASK */
const FLAG_ACTIVITY_NEW_TASK = 0x10000000

export async function resolvePdfUri(id: PdfId): Promise<string | null> {
  try {
    const asset = Asset.fromModule(PDF_ASSETS[id].module)
    await asset.downloadAsync()
    const uri = asset.localUri ?? asset.uri
    if (!uri) return null

    // Land on a cache file://…/*.pdf for Android content URIs / system viewers.
    // Include asset hash in the filename so OTA PDF updates bust the cache
    // (a fixed icacon-day1.pdf path would keep serving the first-opened version forever).
    const base = FileSystem.cacheDirectory
    if (!base) {
      return uri
    }

    const hash = asset.hash ?? 'v'
    const dest = `${base}icacon-${id}-${hash}.pdf`
    if (uri === dest) return dest

    const info = await FileSystem.getInfoAsync(dest)
    if (!info.exists) {
      // Best-effort: drop the old unhashed cache name from earlier app versions
      await FileSystem.deleteAsync(`${base}icacon-${id}.pdf`, { idempotent: true })
      await FileSystem.copyAsync({ from: uri, to: dest })
    }
    return dest
  } catch {
    return null
  }
}

async function sharePdf(uri: string, title: string): Promise<void> {
  const canShare = await Sharing.isAvailableAsync()
  if (!canShare) {
    Alert.alert(title, 'Sharing is not available on this device.')
    return
  }
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: title,
    UTI: 'com.adobe.pdf',
  })
}

/**
 * Android: ACTION_VIEW with content:// URI (not the share sheet).
 * Share is only offered if the user confirms after VIEW fails.
 */
async function openWithAndroidViewer(uri: string): Promise<void> {
  const contentUri = await FileSystem.getContentUriAsync(uri)
  await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
    data: contentUri,
    type: 'application/pdf',
    flags: FLAG_GRANT_READ_URI_PERMISSION | FLAG_ACTIVITY_NEW_TASK,
  })
}

/** Open bundled PDF offline. */
export async function openBundledPdf(id: PdfId): Promise<void> {
  const meta = PDF_ASSETS[id]
  const uri = await resolvePdfUri(id)
  if (!uri) {
    Alert.alert(
      'PDF not available',
      'The file could not be loaded. Reinstall the app or contact the organiser.',
    )
    return
  }

  try {
    if (Platform.OS === 'android') {
      try {
        await openWithAndroidViewer(uri)
        return
      } catch {
        Alert.alert(
          meta.title,
          'Could not open a PDF viewer. Install a PDF app, or share the file instead.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Share file',
              onPress: () => {
                void sharePdf(uri, meta.title)
              },
            },
          ],
        )
        return
      }
    }

    // iOS: system share / open sheet
    await sharePdf(uri, meta.title)
  } catch {
    Alert.alert('Could not open PDF', 'Please try again.')
  }
}
