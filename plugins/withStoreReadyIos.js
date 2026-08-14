const { withInfoPlist } = require('@expo/config-plugins')

/**
 * Strip Expo Dev Client–only local-network strings from store builds.
 * Apple reviewers flag NSLocalNetworkUsageDescription about "Expo Dev Launcher".
 */
function withStoreReadyIos(config) {
  return withInfoPlist(config, (config) => {
    const plist = config.modResults
    delete plist.NSLocalNetworkUsageDescription
    delete plist.NSBonjourServices
    // Prefer not advertising the Expo development URL scheme in store binaries
    if (Array.isArray(plist.CFBundleURLTypes)) {
      plist.CFBundleURLTypes = plist.CFBundleURLTypes.map((entry) => {
        if (!entry.CFBundleURLSchemes) return entry
        return {
          ...entry,
          CFBundleURLSchemes: entry.CFBundleURLSchemes.filter(
            (s) => typeof s === 'string' && !s.startsWith('exp+'),
          ),
        }
      }).filter(
        (entry) =>
          Array.isArray(entry.CFBundleURLSchemes) &&
          entry.CFBundleURLSchemes.length > 0,
      )
    }
    return config
  })
}

module.exports = withStoreReadyIos
