# ICACON 2026 Companion (Mobile)

Expo React Native app for **ICACON 2026** (Aligarh).

- Offline-first: workshops, contacts, and bundled PDFs work without network  
- No login · no analytics · minimal permissions  
- Navigate: workshop & venue Google Maps links (needs network)  

## Run

### Expo Go (quick JS-only)

```bash
npm install
npm run typecheck
npx expo start
```

Scan the QR code in **Expo Go**. Fine for UI work; not a store-shaped binary.

### Development build (recommended)

Your own “Expo Go” with this app’s native modules and config. See [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/).

**1. Install / ensure client package** (already in dependencies):

```bash
npx expo install expo-dev-client
```

**2. Build a native binary** — pick one path:

| Path | When | Commands |
|------|------|----------|
| **EAS cloud** | No local Xcode/Android Studio needed for compile | `npm run build:dev:android` · `npm run build:dev:ios` · `npm run build:dev:ios-sim` |
| **Local** | Mac with Xcode / Android Studio | `npm run run:ios` · `npm run run:android` |

**3. Install the build** (QR / Expo Orbit / emulator drag-drop), then start Metro:

```bash
npm run start:dev-client
```

Open the installed **ICACON 2026** dev app and connect to the bundler.

Rebuild the **native** app only when you add native libraries, change `app.json`, or upgrade the Expo SDK. Pure TS/JS changes only need Metro reload.

**iOS device note:** EAS device builds need a paid Apple Developer account. Simulator builds (`build:dev:ios-sim`) do not install on a physical iPhone. Local `npx expo run:ios --device` can target a plugged-in phone without EAS.

## Structure

| Path | Purpose |
|------|---------|
| `app/(tabs)/` | Home, Navigate, Programme, Info |
| `app/pdf/` | Bundled PDF viewer / system open |
| `src/data/` | Event content, workshops, links |
| `src/lib/` | Linking + PDF helpers |
| `assets/pdfs/` | brochure.pdf, day1.pdf, day2.pdf |
| `docs/` | Privacy, store listing, store checklist |

## Production / stores

See **[docs/store-checklist.md](./docs/store-checklist.md)** before App Store / Play submit.

```bash
eas build --profile production --platform android
eas build --profile production --platform ios
```

## Privacy

Summary: no personal data collection, no tracking. Full text in `docs/privacy.md` — **host publicly** and paste the URL into store consoles.
