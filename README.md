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

## OTA from your phone (no laptop)

JS, copy, and bundled PDFs can go out over the air to the live **1.0.0** store builds. Native / SDK / `version` changes still need a new store binary.

**One-time (laptop, before you travel)**

1. Connect GitHub in [Grok connectors](https://grok.com/connectors) with **write** access (contents + pull requests).
2. Create an Expo access token at [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens).
3. Add it as repo secret `EXPO_TOKEN`: [Settings → Secrets → Actions](https://github.com/AbuIqbal123/icacon-2026-companion-app/settings/secrets/actions) or `gh secret set EXPO_TOKEN`.
4. From your phone, ask Grok to open a tiny PR (e.g. a README comment) and merge it — confirms Grok can write. Then **Actions → Publish OTA → Run workflow** once, to confirm the token.

**On holiday**

1. **PDFs:** in the GitHub app, replace `assets/pdfs/day1-programme.pdf` and/or `day2-programme.pdf`.
2. **Code:** in the Grok app, e.g. *In `AbuIqbal123/icacon-2026-companion-app`, bump `PDF_CACHE_REV` in `src/lib/pdfs.ts` and open a PR.*
3. Merge the PR into `master` (do not push straight to `master` unless you intend to publish).
4. GitHub Action **Publish OTA** runs `eas update --channel production`. Users pick it up on the next app open.

Force a publish without a matching path change: **Actions → Publish OTA → Run workflow**.

Bad update: [roll back on expo.dev](https://expo.dev/accounts/the_abu/projects/icacon-companion-mobile/updates) — republish the previous group. Phones already on the bad bundle get the previous one on next launch.

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
