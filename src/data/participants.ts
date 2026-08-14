/**
 * Participant hall / screen assignments.
 * Keep empty until official list is ready — shipping fake names fails App Store review (2.1).
 * When ready: fill PARTICIPANTS and re-enable the Info section that lists them.
 */

export interface Participant {
  id: string
  name: string
  hall: string
  screen: string
}

/** Official list only — empty = feature hidden. Sorted A–Z by name. */
export const PARTICIPANTS: Participant[] = []
