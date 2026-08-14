# ICACON 2026 Companion

Expo app for **ICACON 2026** (Aligarh, 11–13 September 2026). iOS and Android.

- Offline-first: workshops, contacts, and bundled PDFs work without network
- No login · no analytics · minimal permissions
- Navigate: workshop and venue Maps links (needs network)

## Run

```bash
npm install
npm run typecheck
npx expo start
```

Scan the QR code in **Expo Go** for JS-only UI work. For a store-shaped binary, use a development build.

### Development build

| Path | When | Commands |
|------|------|----------|
| **EAS cloud** | No local Xcode/Android Studio needed | `npm run build:dev:android` · `npm run build:dev:ios` · `npm run build:dev:ios-sim` |
| **Local** | Mac with Xcode / Android Studio | `npm run run:ios` · `npm run run:android` |

Then:

```bash
npm run start:dev-client
```

Rebuild the native app only when you add native libraries, change `app.json`, or upgrade the Expo SDK. Pure TS/JS changes only need Metro reload.

## Structure

| Path | Purpose |
|------|---------|
| `app/(tabs)/` | Home, Navigate, Programme, Info |
| `app/pdf/` | Bundled PDF viewer / system open |
| `src/data/` | Event content, workshops, links |
| `src/lib/` | Linking + PDF helpers |
| `assets/pdfs/` | brochure, Day 1, Day 2 programmes |
| `docs/` | Privacy, store listing, store checklist |

## Production / stores

See **[docs/store-checklist.md](./docs/store-checklist.md)** before App Store / Play submit.

```bash
eas build --profile production --platform android
eas build --profile production --platform ios
```

iOS bundle ID: `com.icacon.companion`  
Android package: `com.icacon2026.companion`

## PDFs for offline use

Place official files in `assets/pdfs/`:

- https://www.icaconaligarh.com/pdf/brochure.pdf → `brochure.pdf`
- https://www.icaconaligarh.com/pdf/day1.pdf → `day1-programme.pdf`
- https://www.icaconaligarh.com/pdf/day2.pdf → `day2-programme.pdf`

## Privacy

No personal data collection, no tracking. Full text in `docs/privacy.md`.

## Links

- Official site: https://www.icaconaligarh.com
- Registration: https://in.eregnow.com/ticketing/register/icacon2026
