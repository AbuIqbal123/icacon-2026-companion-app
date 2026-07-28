const { withAndroidManifest } = require('@expo/config-plugins')

/**
 * Allow resolving PDF VIEWER apps on Android 11+ (package visibility).
 */
function withAndroidPdfQuery(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest
    if (!manifest.queries) {
      manifest.queries = []
    }

    const queries = Array.isArray(manifest.queries)
      ? manifest.queries
      : [manifest.queries]

    const hasPdf = queries.some((q) => {
      const intents = q.intent
        ? Array.isArray(q.intent)
          ? q.intent
          : [q.intent]
        : []
      return intents.some((intent) => {
        const data = intent.data
          ? Array.isArray(intent.data)
            ? intent.data
            : [intent.data]
          : []
        return data.some(
          (d) => d.$?.['android:mimeType'] === 'application/pdf',
        )
      })
    })

    if (!hasPdf) {
      queries.push({
        intent: [
          {
            action: [
              {
                $: { 'android:name': 'android.intent.action.VIEW' },
              },
            ],
            category: [
              {
                $: { 'android:name': 'android.intent.category.DEFAULT' },
              },
            ],
            data: [
              {
                $: { 'android:mimeType': 'application/pdf' },
              },
            ],
          },
        ],
      })
      manifest.queries = queries
    }

    return config
  })
}

module.exports = withAndroidPdfQuery
