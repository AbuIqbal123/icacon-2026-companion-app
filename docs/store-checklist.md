# App Store & Play Store — production checklist

## Will this pass Apple review?

**Yes — with conditions.** The app is a solid offline-first conference companion (programme, PDFs, contacts, maps links). That meets **minimum functionality** when content is real.

### Must not ship (would fail 2.1 Completeness)

| Issue | Status |
|---|---|
| Fake participant list + “coming soon” | **Removed** for store |
| Placeholder / incomplete features advertised | Do not re-add until data is real |
| Privacy policy URL not live | **Live:** https://abuiqbal123.github.io/icacon-privacy/ |
| Production build with Expo Dev Launcher strings | **Stripped** via plugin + Info.plist |

### App Privacy labels (App Store Connect)

- **Data Not Collected**
- **Tracking:** No  
- Matches binary: no analytics SDKs

### Export compliance

- `ITSAppUsesNonExemptEncryption: false` (HTTPS only)

### Review notes tip (optional in App Store Connect)

> Offline conference companion. No login / no demo account. On iOS, venue taps offer Apple Maps first, then Google Maps. Test maps online; PDFs offline. No IAP — registration fees are external website only. Support: icacon2026@gmail.com

### App Review rejection (Aug 2026) — checklist

| Guideline | Fix |
|---|---|
| **4 Design** | Code: iOS maps chooser (Apple Maps + Google Maps). Resubmit binary. |
| **2.1(a)** | Reply: no login; leave demo fields blank; paste notes from `docs/app-store-listing-copy.md` |
| **2.1(b)** | Reply: free app, no IAP; fees are physical conference only via external website |

---

## Fixed in code

- [x] No fake participants in UI  
- [x] Offline programme + PDFs + contacts  
- [x] Maps / web need network with clear alert  
- [x] Android PDF VIEW intent + queries; Share only on explicit fallback  
- [x] Encryption flag + privacy manifest  
- [x] Blocked unused Android permissions  
- [x] Store-ready iOS plugin (no Dev Launcher local network copy)  
- [x] Release minify/shrink for Android  

## You complete before submit

- [ ] Apple Developer Program  
- [x] Host privacy policy HTTPS — https://abuiqbal123.github.io/icacon-privacy/  
- [ ] App Store Connect privacy labels + support URL  
- [x] **iOS listing copy** — `docs/app-store-listing-copy.md` + `store.config.json`  
- [x] **iOS iPhone 6.9" screenshots** — `docs/app-store-assets/screenshots-iphone-6.9/` (5 shots, 1320×2868)  
- [x] **iOS iPad 13" screenshots** — `docs/app-store-assets/screenshots-ipad-13/` (Home + Navigate; optional while `supportsTablet: false`)  
- [x] **Android screenshots** — `docs/play-store-assets/`  
- [ ] `eas build --profile production --platform ios` (not development/preview for store)  
- [x] Official day1/day2 programme PDFs (assets/pdfs/day1-programme.pdf, day2-programme.pdf)  
- [ ] App Store version **1.0.1** — What’s New copy in `docs/app-store-listing-copy.md`

### iOS App Store Connect (summary)

| Item | Where |
|---|---|
| Name / subtitle / description / keywords | `docs/app-store-listing-copy.md` |
| **Copyright** (App Information — required) | `2026 ICACON Aligarh` |
| Metadata push (optional) | `store.config.json` → `eas metadata:push` after first binary |
| Privacy policy | https://abuiqbal123.github.io/icacon-privacy/ |
| Support URL | https://www.icaconaligarh.com |
| Bundle ID | `com.icacon.companion` |
| Tablet screenshots | Only required if `ios.supportsTablet` is true (currently **false**) |

## Build (store)

```bash
npm run typecheck
eas build --profile production --platform ios
eas build --profile production --platform android
```

Use **production** profile only for store — not `development` (dev client) or `preview` (internal QA).

## QA (airplane + online)

1. Cold start offline — Home, Programme, Info, Navigate list  
2. PDFs offline  
3. Phone / email offline  
4. Website / Register / Maps online  
5. Maps offline — “no internet” alert  
6. No crashes switching tabs  

## Play Data safety

- Data collected: **No**  
- Data shared: **No**  

---

## Google Play — path to production (personal / new accounts)

Google requires setup + **closed testing** before production. Internal testing is optional.

### 1. Finish setting up your app (Dashboard)

Complete every incomplete task under **Dashboard → Set up your app** (names vary slightly):

| Task | What to put for ICACON |
|---|---|
| **App access** | All features without login |
| **Ads** | No |
| **Content ratings** | IARC questionnaire — conference info app |
| **Target audience** | Adults / not primarily children |
| **News app** | No |
| **COVID-19 contact tracing / status** | No |
| **Data safety** | No data collected, no data shared |
| **Government apps** | No (unless you declare otherwise) |
| **Financial features** | No |
| **Health** | Not a clinical/medical device app — event companion only |
| **Privacy policy** | https://abuiqbal123.github.io/icacon-privacy/ |
| **Store listing** | Title, short + full description, icon, feature graphic, screenshots, category, contact email |

Store listing draft: `docs/store-listing.md`.

**Screenshots (Android):** at least phone; 2–8 screens showing Home, Programme, PDF, Info, Navigate.  
**Feature graphic:** 1024 × 500 px (required for store listing).

### 2. Internal testing (optional, same day)

Use for your own devices / a few trusted people **before** closed test is ready.

1. **Testing → Internal testing → Create new release**
2. Upload a **production AAB** (not debug APK, not Expo Go):

```bash
npm run typecheck
eas build --profile production --platform android
# After build finishes:
eas submit --platform android --latest
# Or upload the .aab manually in Play Console
```

3. Add testers (email list or Google Group) → **Save** → **Review release** → **Start rollout to Internal testing**
4. Testers open the opt-in link on an Android device, install from Play Store

Internal builds are often available within minutes. This does **not** replace closed testing.

### 3. Closed testing (required for production access)

Criteria Google shows on the dashboard:

- [ ] Publish a **closed testing** release (AAB on a closed track)
- [ ] **≥ 12 testers opted in** (not just invited — they must accept the test)
- [ ] Test runs **≥ 14 consecutive days** with that bar met
- [ ] Then **Apply for production** and answer closed-test questions

**How to run it**

1. Finish setup (step 1) so closed testing unlocks  
2. **Testing → Closed testing → Create track** (or use default *Closed testing - Alpha*)  
3. Create a release with the **same production AAB** (or a newer production build)  
4. **Testers** tab → email list / Google Group with **at least 12 people** who will actually install  
5. Share the **opt-in URL**; each person must:
   - Open the link while signed into Play with that Google account  
   - Accept to become a tester  
   - Install the app from Play  
6. Keep the closed release **active for 14+ days** while ≥12 stay opted in  
7. Collect light feedback (bugs, crashes, listing accuracy)

**Finding 12 testers for ICACON**

Colleagues, department staff, organising committee, volunteers, friends with Android phones. A **Google Group** is easiest to manage (add emails once; people join the group then opt in).

Testers only need a normal Google account + Android device. They do **not** need a developer account.

### 4. Apply for production

After the closed-test criteria are green:

1. Dashboard → **Apply for production** (or Production → apply)  
2. Answer questions about who tested, what feedback you got, how you fixed issues  
3. Create a **Production** release (same or newer AAB), submit for review  

Honest short answers work, e.g.:

> Closed test with organising committee and volunteers (≥12). Testers used offline programme, PDFs, contacts, and maps links. Feedback: [brief]. Issues fixed: [or none critical].

### Build rules for Play

| Profile | Use for Play? |
|---|---|
| `production` (`app-bundle`) | **Yes** — internal, closed, production |
| `preview` / `development` APK | No — not for Play tracks |
| Local debug APK | No |

```bash
eas build --profile production --platform android
eas submit --platform android --latest   # needs Play service account or manual upload
```

### Parallel: keep polishing while the 14 days run

- Official day1/day2 PDFs if still drafts  
- Screenshots + feature graphic  
- Any crash fixes → new production build → new closed release (versionCode auto-increments)  
- Do **not** pause/end the closed track early if you need the 14-day clock  

