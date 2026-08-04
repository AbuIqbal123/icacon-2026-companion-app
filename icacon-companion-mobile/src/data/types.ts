export type EventDayId = 'workshop' | 'day1' | 'day2'

/** Dual map links so users can open Apple Maps or Google Maps. */
export interface MapLinks {
  /** Google Maps place / short link */
  googleMapsUrl: string
  /** maps.apple.com URL — opens native Apple Maps on iOS */
  appleMapsUrl: string
}

export interface EventDay {
  id: EventDayId
  label: string
  shortLabel: string
  dateLabel: string
  venue: string
  maps: MapLinks
  note?: string
}

export interface AgendaItem {
  id: string
  dayId: EventDayId
  time: string
  title: string
  location: string
  type: 'session' | 'break' | 'registration' | 'keynote' | 'quiz' | 'social'
  speaker?: string
}

export type PdfId = 'brochure' | 'day1' | 'day2'
