import { StatusBar } from 'expo-status-bar'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronRight, MapPin } from 'lucide-react-native'
import {
  EVENT_META,
  USG_REGIONAL_MAPS,
  VENUE_MAPS,
  WORKSHOP_VENUE_MAPS,
} from '@/src/data/events'
import { colors } from '@/src/theme/colors'
import { openExternal } from '@/src/lib/linking'

type Place = { id: string; title: string; meta: string; mapsUrl: string }

const MAIN: Place[] = [
  {
    id: 'jnmc',
    title: 'JNMC, AMU Aligarh',
    meta: '11 Sept · Workshops',
    mapsUrl: VENUE_MAPS.jnmc,
  },
  {
    id: 'lemon',
    title: EVENT_META.conferenceVenue,
    meta: '12–13 Sept · Conference',
    mapsUrl: VENUE_MAPS.lemonTree,
  },
]

const WORKSHOP_SITES: Place[] = [
  {
    id: 'paramedical',
    title: 'Paramedical College',
    meta: 'Airway · POCUS · Ventilation · Obstetrics',
    mapsUrl: WORKSHOP_VENUE_MAPS,
  },
  {
    id: 'ot',
    title: 'Surgery OT Complex',
    meta: 'Near Dept of Anaesthesia · USG Regional',
    mapsUrl: USG_REGIONAL_MAPS,
  },
]

function PlaceList({ places }: { places: Place[] }) {
  return (
    <View style={styles.card}>
      {places.map((place, i) => (
        <View key={place.id}>
          <Pressable
            onPress={() => openExternal(place.mapsUrl)}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          >
            <View style={styles.rowIcon}>
              <MapPin size={18} color={colors.brand} />
            </View>
            <View style={styles.rowCopy}>
              <Text style={styles.rowTitle}>{place.title}</Text>
              <Text style={styles.rowMeta}>{place.meta}</Text>
            </View>
            <ChevronRight size={18} color={colors.inkMuted} />
          </Pressable>
          {i < places.length - 1 ? <View style={styles.divider} /> : null}
        </View>
      ))}
    </View>
  )
}

export default function NavigateScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Dark icons so time/battery read on light background */}
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Navigate</Text>
        <Text style={styles.sub}>Directions to event places</Text>

        <Text style={styles.section}>Main</Text>
        <PlaceList places={MAIN} />

        <Text style={styles.section}>Workshop sites</Text>
        <PlaceList places={WORKSHOP_SITES} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: 20, paddingBottom: 40 },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  sub: {
    fontSize: 14,
    color: colors.inkMuted,
    marginTop: 4,
    marginBottom: 20,
  },
  section: {
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '600',
    color: colors.inkMuted,
  },
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 12,
    minHeight: 72,
  },
  rowPressed: { backgroundColor: colors.surface },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(134, 52, 25, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCopy: { flex: 1, minWidth: 0 },
  rowTitle: { fontSize: 16, fontWeight: '600', color: colors.ink },
  rowMeta: { marginTop: 3, fontSize: 13, color: colors.inkMuted },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 66,
  },
})
