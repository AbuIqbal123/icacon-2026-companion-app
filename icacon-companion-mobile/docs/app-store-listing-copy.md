# App Store Connect — listing copy (en-US)

Copy each field into **App Store Connect → your app → App Store → [version] → App Information / Product Page**.

Also available as machine-readable metadata in `store.config.json` (for `eas metadata:push` after a binary exists).

---

## App name * (max 30)

```
ICACON 2026 Companion
```

(21 / 30 characters)

---

## Subtitle * (max 30)

```
Offline programme & contacts
```

(28 / 30 characters)

### Alternate subtitles (pick one)

```
Conference programme offline
```

```
Workshops, PDFs, maps, contacts
```

---

## Promotional text (max 170, optional — editable without new binary)

```
Official-style companion for ICACON 2026 in Aligarh (11–13 Sept). Workshops, programme PDFs, and contacts work offline. Free. No account.
```

(148 / 170 characters)

---

## Description * (max 4000)

```
ICACON 2026 Companion is a free mobile companion for the 7th International & 17th National Conference of the Indian College of Anaesthesiologists in Aligarh (11–13 September 2026).

Built for on-site use with limited connectivity. Core content works offline. No account required. No ads.

WHAT YOU GET OFFLINE
• Workshop list and workshop-day schedule
• Conference brochure PDF
• Day 1 and Day 2 programme PDFs
• Secretariat and registration contacts (tap to call or email)

WHEN ONLINE
• Official website, registration, and venue pages
• Workshop and venue locations open in Maps (internet required)

NAVIGATION
This app opens Maps for venues. It does not provide indoor GPS routing or live turn-by-turn navigation inside buildings.

ABOUT THE EVENT
ICACON 2026 — Towards Smarter Anaesthesia: Integrating Technology, Intelligence & Precision
Organised by the Department of Anaesthesiology & Critical Care, JNMC, Aligarh Muslim University
Workshop day: 11 September 2026 (JNMC, AMU Aligarh)
Conference: 12–13 September 2026 (Lemon Tree Hotel, Aligarh)

PRIVACY
We do not collect personal data. No analytics or tracking SDKs.
Privacy policy: https://abuiqbal123.github.io/icacon-privacy/

SUPPORT
Website: https://www.icaconaligarh.com
Email: icacon2026@gmail.com
```

---

## Keywords * (max 100 characters, comma-separated, no spaces after commas)

```
anaesthesia,anesthesia,Aligarh,conference,JNMC,AMU,workshops,medical,schedule,brochure
```

(89 / 100 characters)

Notes:
- Do **not** repeat words already in the title or subtitle (Apple counts each word once).  
  Title already has “ICACON”; subtitle already has “programme” / “contacts” / “offline”.
- No spaces after commas maximizes the 100-character budget.

---

## What's New (Version 1.0.0)

```
Initial release of ICACON 2026 Companion.

• Offline workshop list and programme
• Brochure and Day 1 / Day 2 PDFs
• Secretariat and registration contacts
• Maps links for venues (when online)
```

---

## URLs

| Field | Value |
|---|---|
| **Support URL** * | https://www.icaconaligarh.com |
| **Marketing URL** (optional) | https://www.icaconaligarh.com |
| **Privacy Policy URL** * | https://abuiqbal123.github.io/icacon-privacy/ |

---

## Categories

| Field | Value |
|---|---|
| **Primary** | Medical |
| **Secondary** (optional) | Lifestyle |

If Medical feels wrong for review, use **Reference** primary and **Medical** secondary.

---

## Copyright * (App Information — required)

App Store Connect → **App Information** → **Copyright** (not on the version page).

Format: year + name of the person or entity that owns the exclusive rights. Do not use the © symbol if the field rejects it; year + name is enough.

```
2026 ICACON Aligarh
```

### Alternates (if the rights holder name is more specific)

```
2026 ICACON Organising Committee
```

```
2026 Department of Anaesthesiology & Critical Care, JNMC, AMU
```

Also set in `store.config.json` as `apple.copyright` for `eas metadata:push`.

---

## Age rating / content rights

- **Age rating:** 4+ (answer questionnaire honestly — no unrestricted web browsing inside the app, no UGC, no medical treatment advice beyond event info)
- **Content rights:** You own or have rights to logos, PDFs, and conference content used in the app

### Age rating questionnaire (typical answers for this app)

| Topic | Answer |
|---|---|
| Cartoon/fantasy violence | None |
| Realistic violence | None |
| Sexual content | None |
| Profanity | None |
| Drugs/alcohol/tobacco | None |
| Simulated gambling | None |
| Horror/fear | None |
| Mature/suggestive | None |
| Medical/treatment info | None or Infrequent (event info only — not clinical advice) |
| Unrestricted web access | No |
| Gambling | No |
| Contests | None |

---

## App Privacy (App Store Connect)

| Question | Answer |
|---|---|
| Privacy policy URL | https://abuiqbal123.github.io/icacon-privacy/ |
| Data collected? | **No** — Data Not Collected |
| Tracking? | **No** |
| Matches binary | No analytics / ads / crash SDKs |

---

## Pricing & availability

| Field | Value |
|---|---|
| Price | Free |
| Availability | All territories (or India + relevant countries) |
| Pre-order | Optional |

---

## App Review Information

| Field | Value |
|---|---|
| Contact first name | *(your name)* |
| Contact last name | *(your name)* |
| Contact phone | *(your phone with country code)* |
| Contact email | icacon2026@gmail.com |
| Demo account | **Not required** — no login |
| Notes | See below |

### Review notes (paste into App Store Connect)

```
ICACON 2026 Companion is an offline-first conference information app for a medical conference in Aligarh (11–13 September 2026).

No login or account is required. All core features work offline:
- Home: workshop list
- Programme: workshop day schedule + brochure / Day 1 / Day 2 PDFs
- Info: secretariat and registration contacts (tel: / mailto:)
- Navigate: list of venues; Maps opens only when online

Maps and website links need network access; offline use shows a clear “no internet” style alert.
Export compliance: HTTPS only; ITSAppUsesNonExemptEncryption = false.
Support: icacon2026@gmail.com
```

---

## Export compliance

Already set in `app.json` / Info.plist:

- `ITSAppUsesNonExemptEncryption`: **false** (HTTPS only)

In App Store Connect, answer: **No** to non-exempt encryption / uses only standard encryption.

---

## Screenshots & app icon

### App icon

- Source: `assets/images/icon.png` (1024×1024 in the Xcode asset catalog)
- App Store Connect uses the 1024×1024 icon from the binary — no separate upload if the archive includes it

### Required screenshot sizes (2026)

| Slot | Size (portrait) | Required? | Folder in this repo |
|---|---|---|---|
| **iPhone 6.5" / 6.7"** (ASC often asks for these) | **1284×2778** or **1242×2688** | **Yes** | `docs/app-store-assets/screenshots-iphone-6.5/` (1284×2778) |
| **iPhone 6.9"** (source / newer slots) | **1320×2868** | If ASC shows a 6.9" slot | `docs/app-store-assets/screenshots-iphone-6.9/` |
| **iPad 13"** | **2064×2752** | **Only if iPad supported** | `docs/app-store-assets/screenshots-ipad-13/` |

Current `app.json`: `"supportsTablet": false` → **App Store Connect will not require iPad screenshots.**

**If ASC errors with “must be 1242×2688 or 1284×2778”** → upload from the **6.5** folder below (not the 6.9 folder).

### iPhone screenshots to upload (App Store Connect)

**Use this set first:** `docs/app-store-assets/screenshots-iphone-6.5/` · **1284×2778**  
(Matches ASC: 1284×2778 / 2778×1284)

Alternate if a slot specifically wants XS Max size: `docs/app-store-assets/screenshots-iphone-6.5-alt-1242/` · **1242×2688**

| Order | File | Screen |
|---|---|---|
| 1 | `01-home.png` | Home — brand + entry cards |
| 2 | `02-navigate.png` | Navigate — venue list |
| 3 | `03-programme.png` | Programme — workshops day |
| 4 | `04-info.png` | Info — contacts / resources |
| 5 | `05-day1-pdf.png` | Day 1 programme PDF |

Upload all 5 (min 3, max 10).

### iPad 13" set (optional — tablet not declared)

Device: iPad Pro 13" (M5) · **2064×2752** · app runs in **iPhone compatibility** mode while `supportsTablet` is false

| File | Screen | Notes |
|---|---|---|
| `01-home.png` | Home | Verified |
| `02-navigate.png` | Navigate | Verified |

Further iPad screens need either manual capture or `supportsTablet: true` + rebuild (automation is unreliable in compatibility mode).

**Do not** use Android Play screenshots for App Store — wrong device chrome and often wrong resolution.

---

## Bundle / version identifiers

| Field | Value |
|---|---|
| Bundle ID | `com.icacon.companion` |
| Version (marketing) | `1.0.0` |
| Build number | Managed by EAS `autoIncrement` on production builds |
| SKU (App Store Connect, first create) | e.g. `icacon2026companion` |

---

## Build & submit (production)

```bash
npm run typecheck
eas build --profile production --platform ios
eas submit --platform ios --latest
```

Then in App Store Connect:

1. Wait for build processing  
2. **App Information → Copyright** → `2026 ICACON Aligarh` (required; missing this blocks save/submit)  
3. Select the build on the version page  
4. Paste listing copy from this file  
5. Upload screenshots  
6. Complete App Privacy + age rating  
7. Submit for review  

Optional after first binary exists:

```bash
eas metadata:push   # uses store.config.json
```

---

## Pre-submit checklist (iOS)

- [ ] Apple Developer Program membership active  
- [ ] App record created in App Store Connect (bundle ID match)  
- [ ] Privacy policy URL live  
- [ ] Screenshots uploaded (iPhone 6.9"+)  
- [ ] Description, subtitle, keywords filled  
- [ ] Copyright filled under App Information (`2026 ICACON Aligarh`)  
- [ ] App Privacy = Data Not Collected  
- [ ] Export compliance answered  
- [ ] Production IPA built with `production` profile (not development / preview)  
- [ ] Review notes + contact filled  
- [ ] No placeholder / “coming soon” content in the binary  
- [ ] QA: offline Home / Programme / PDFs / Info; online Maps / website  
