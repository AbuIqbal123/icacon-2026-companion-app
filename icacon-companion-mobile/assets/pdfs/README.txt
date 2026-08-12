Place official offline PDFs here (filenames matter):

  brochure.pdf         ← https://www.icaconaligarh.com/pdf/brochure.pdf
  day1-programme.pdf   ← Day 1 scientific programme (bundled offline)
  day2-programme.pdf   ← Day 2 scientific programme (bundled offline)

When updating programmes, replace day1-programme.pdf / day2-programme.pdf
and bump PDF_CACHE_REV in src/lib/pdfs.ts so clients re-copy into cache.

After replacing files:
  npx expo start -c
  eas update --channel production --environment production --message "..."
