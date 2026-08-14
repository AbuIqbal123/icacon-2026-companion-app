const { withAndroidStyles, withAndroidManifest } = require('@expo/config-plugins')

/**
 * Play Console large-screen + edge-to-edge quality:
 * - allow resize / rotation (no portrait lock on Android)
 * - drop deprecated status/nav bar theme colours (Android 15+)
 */
function withAndroidPlayQuality(config) {
  config = withAndroidManifest(config, (config) => {
    const application = config.modResults.manifest.application?.[0]
    const activities = application?.activity
    if (!Array.isArray(activities)) return config

    for (const activity of activities) {
      if (activity.$?.['android:name'] !== '.MainActivity') continue
      delete activity.$['android:screenOrientation']
      activity.$['android:resizeableActivity'] = 'true'
    }
    return config
  })

  return withAndroidStyles(config, (config) => {
    const styles = config.modResults.resources?.style
    const list = styles ? (Array.isArray(styles) ? styles : [styles]) : []
    const drop = new Set(['android:statusBarColor', 'android:navigationBarColor'])

    for (const style of list) {
      if (!style.item) continue
      const items = Array.isArray(style.item) ? style.item : [style.item]
      style.item = items.filter((item) => !drop.has(item.$?.name))
    }
    return config
  })
}

module.exports = withAndroidPlayQuality
