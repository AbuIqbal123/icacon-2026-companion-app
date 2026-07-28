import type { EventDay, PdfId } from './types'

/** Official links — icaconaligarh.com */
export const LINKS = {
  website: 'https://www.icaconaligarh.com',
  brochureRemote: 'https://www.icaconaligarh.com/pdf/brochure.pdf',
  partnershipBrochure: 'https://www.icaconaligarh.com/pdf/partnership-brochure.pdf',
  program: 'https://www.icaconaligarh.com/program.php',
  day1PdfRemote: 'https://www.icaconaligarh.com/pdf/day1.pdf',
  day2PdfRemote: 'https://www.icaconaligarh.com/pdf/day2.pdf',
  workshops: 'https://www.icaconaligarh.com/workshops.php',
  venue: 'https://www.icaconaligarh.com/venue.php',
  registrationPage: 'https://www.icaconaligarh.com/registration.php',
  register: 'https://in.eregnow.com/ticketing/register/icacon2026',
  organiser: 'https://www.meetingsnmore.com/mnm/',
  email: 'mailto:icacon2026@gmail.com',
  /** Public privacy policy (App Store / Play requirement + in-app link) */
  privacy: 'https://abuiqbal123.github.io/icacon-privacy/',
} as const

export const EVENT_META = {
  name: 'ICACON 2026',
  appName: 'ICACON 2026 Companion',
  fullName:
    '7th International & 17th National Conference of the Indian College of Anaesthesiologists',
  subtitle: 'Event companion · Aligarh',
  venue: 'Jawaharlal Nehru Medical College',
  university: 'AMU Aligarh',
  organisedBy:
    'Department of Anaesthesiology & Critical Care, JNMC, Aligarh Muslim University',
  dateLabel: '11–13 September 2026',
  dateShort: '11–13 Sept 2026',
  workshopDate: '11 September 2026',
  workshopDateShort: '11 Sept 2026',
  conferenceDates: '12–13 September 2026',
  conferenceVenue: 'Lemon Tree Hotel, Aligarh',
  theme: 'Towards Smarter Anaesthesia: Integrating Technology, Intelligence & Precision',
}

/** Google Maps deep links (opens app or browser) */
export const VENUE_MAPS = {
  jnmc: 'https://maps.app.goo.gl/uXS29KWGHc5QdaB66',
  lemonTree: 'https://maps.app.goo.gl/TzJznfYVW3rAj5Y6A',
} as const

export const EVENT_DAYS: EventDay[] = [
  {
    id: 'workshop',
    label: 'Workshops',
    shortLabel: '11 Sept',
    dateLabel: '11 September 2026',
    venue: 'JNMC, AMU Aligarh',
    mapsUrl: VENUE_MAPS.jnmc,
    note: 'Pre-conference workshops',
  },
  {
    id: 'day1',
    label: 'Conference Day 1',
    shortLabel: '12 Sept',
    dateLabel: '12 September 2026',
    venue: 'Lemon Tree Hotel, Aligarh',
    mapsUrl: VENUE_MAPS.lemonTree,
    note: 'Official programme: Day 1 PDF',
  },
  {
    id: 'day2',
    label: 'Conference Day 2',
    shortLabel: '13 Sept',
    dateLabel: '13 September 2026',
    venue: 'Lemon Tree Hotel, Aligarh',
    mapsUrl: VENUE_MAPS.lemonTree,
    note: 'Official programme: Day 2 PDF',
  },
]

/**
 * Pre-conference workshops (11 Sept).
 * All run in parallel 09:00–16:00 (user-confirmed).
 */
export const WORKSHOP_DAY = {
  timeLabel: '09:00 – 16:00',
  timeNote: 'All workshops run simultaneously',
  fee: '₹4,000',
} as const

/** Four workshops (Airway, POCUS, Ventilation, Obstetrics) — Paramedical College. */
export const WORKSHOP_VENUE_MAPS =
  'https://maps.app.goo.gl/BWgH6jRMjLnwkysM6' as const

/** USG Regional — Surgery OT Complex (near Dept of Anaesthesia). */
export const USG_REGIONAL_MAPS =
  'https://maps.app.goo.gl/2kF68afduK8JVnHq7?g_st=ic' as const

export const USG_REGIONAL_VENUE = 'Surgery OT Complex' as const
export const USG_REGIONAL_VENUE_NOTE = 'Near Dept of Anaesthesia' as const

export interface Workshop {
  id: string
  title: string
  director?: string
  fee: string
  /** Venue name (shown only when not the default shared site) */
  venueLabel: string
  /** Optional second venue line (keeps rows readable) */
  venueNote?: string
  /** Google Maps link */
  mapsUrl: string
  /** true = Paramedical College with the other main workshops */
  sharedSite?: boolean
}

export const WORKSHOPS: Workshop[] = [
  {
    id: 'airway',
    title: 'Advanced Airway Workshop',
    director: 'Prof. Rashid M Khan',
    fee: '₹4,000',
    venueLabel: 'Paramedical College',
    mapsUrl: WORKSHOP_VENUE_MAPS,
    sharedSite: true,
  },
  {
    id: 'pocus',
    title: 'Point of Care Ultrasound (POCUS)',
    director: 'Prof. Poonam Malhotra',
    fee: '₹4,000',
    venueLabel: 'Paramedical College',
    mapsUrl: WORKSHOP_VENUE_MAPS,
    sharedSite: true,
  },
  {
    id: 'vent',
    title: 'Mechanical Ventilation',
    director: 'Dr. Yash Javeri',
    fee: '₹4,000',
    venueLabel: 'Paramedical College',
    mapsUrl: WORKSHOP_VENUE_MAPS,
    sharedSite: true,
  },
  {
    id: 'ob',
    title: 'Obstetrics Crisis Simulation and Skill',
    director: 'Dr. Faiza Khan',
    fee: '₹4,000',
    venueLabel: 'Paramedical College',
    mapsUrl: WORKSHOP_VENUE_MAPS,
    sharedSite: true,
  },
  {
    id: 'blocks',
    title: 'Ultrasound Guided Regional Nerve Blocks',
    director: 'Dr. Md Ishtiyaque Hussain',
    fee: '₹4,000',
    venueLabel: USG_REGIONAL_VENUE,
    venueNote: USG_REGIONAL_VENUE_NOTE,
    mapsUrl: USG_REGIONAL_MAPS,
    sharedSite: false,
  },
]

export const OFFLINE_INFO = {
  helpdesk: 'Registration Desk, Ground Floor (JNMC)',
  emergency: 'Hospital ER · Ground Floor',
  secretariat: {
    dept: 'Department of Anaesthesiology & Critical Care',
    college: 'Jawaharlal Nehru Medical College, AMU Aligarh',
    secretary: 'Prof. Obaid A Siddiqui, Organising Secretary',
    phones: ['+91 98976 95761', '+91 97168 02158'],
    email: 'icacon2026@gmail.com',
  },
  registrationContact: {
    name: 'Mr. Rachit Bisht',
    role: 'Registration Incharge',
    phone: '+91 89209 49917',
    email: 'projects@meetingsnmore.com',
  },
  organiser: {
    name: 'Meetings and More (Professional Conference Organiser)',
    web: 'www.meetingsnmore.com',
  },
  tips: [
    '11 Sept workshops · JNMC · 09:00–16:00 (all parallel)',
    '12–13 Sept conference · Lemon Tree Hotel',
    'Workshop fee: ₹4,000 (incl. GST)',
  ],
}

/** Bundled PDF modules — replace files in assets/pdfs/ with official downloads. */
export const PDF_ASSETS: Record<PdfId, { title: string; module: number }> = {
  brochure: {
    title: 'ICACON Brochure',
    module: require('../../assets/pdfs/brochure.pdf'),
  },
  day1: {
    title: 'Day 1 Programme',
    module: require('../../assets/pdfs/day1.pdf'),
  },
  day2: {
    title: 'Day 2 Programme',
    module: require('../../assets/pdfs/day2.pdf'),
  },
}
