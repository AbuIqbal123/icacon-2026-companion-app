import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Calendar, ChevronRight, Compass, Info, MapPin } from 'lucide-react-native'
import { EVENT_META, LINKS } from '@/src/data/events'
import { LOGOS } from '@/src/data/logos'
import { colors } from '@/src/theme/colors'
import { openExternal } from '@/src/lib/linking'

export default function HomeScreen() {
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.safe}>
      {/* White clock/battery on brown hero */}
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Brown extends under the notch; content sits below the status bar. */}
        <View style={[styles.hero, { paddingTop: insets.top + 12 }]}>
          <View style={styles.logoRow}>
            <Image
              source={LOGOS.icacon}
              style={styles.logoMain}
              accessibilityLabel="Indian College of Anaesthesiologists"
            />
            <Image
              source={LOGOS.amu}
              style={styles.logoMain}
              accessibilityLabel="Aligarh Muslim University"
            />
            <Image
              source={LOGOS.meetingsAndMore}
              style={styles.logoMain}
              accessibilityLabel="Meetings and More"
            />
          </View>
          <Text style={styles.heroEyebrow}>7th International & 17th National</Text>
          <Text style={styles.heroTitle}>{EVENT_META.name}</Text>
          <Text style={styles.heroOrg}>Indian College of Anaesthesiologists</Text>
          <Text style={styles.heroTheme} numberOfLines={3}>
            {EVENT_META.theme}
          </Text>
          <View style={styles.chips}>
            <View style={styles.chip}>
              <MapPin size={12} color={colors.goldSoft} />
              <Text style={styles.chipText}>{EVENT_META.dateShort}</Text>
            </View>
            <View style={[styles.chip, styles.chipMuted]}>
              <Text style={styles.chipText}>Aligarh</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Pressable
            onPress={() => router.push('/(tabs)/programme')}
            style={({ pressed }) => [styles.navCard, pressed && { opacity: 0.92 }]}
          >
            <View style={styles.navIcon}>
              <Calendar size={22} color={colors.brand} strokeWidth={2} />
            </View>
            <View style={styles.navCopy}>
              <Text style={styles.navTitle}>Programme</Text>
              <Text style={styles.navSub}>11–13 Sept · Workshops & conference</Text>
            </View>
            <ChevronRight size={20} color={colors.inkMuted} />
          </Pressable>

          <Pressable
            onPress={() => router.push('/(tabs)/navigate')}
            style={({ pressed }) => [styles.navCard, pressed && { opacity: 0.92 }]}
          >
            <View style={styles.navIcon}>
              <Compass size={22} color={colors.brand} strokeWidth={2} />
            </View>
            <View style={styles.navCopy}>
              <Text style={styles.navTitle}>Navigate</Text>
              <Text style={styles.navSub}>Directions to event places</Text>
            </View>
            <ChevronRight size={20} color={colors.inkMuted} />
          </Pressable>

          <View style={styles.row3}>
            <Pressable
              style={styles.miniBtn}
              onPress={() => openExternal(LINKS.website)}
            >
              <Text style={styles.miniBtnText}>Website</Text>
            </Pressable>
            <Pressable style={styles.miniBtn} onPress={() => router.push('/pdf/brochure')}>
              <Text style={styles.miniBtnText}>Brochure</Text>
            </Pressable>
            <Pressable
              style={styles.miniBtn}
              onPress={() => openExternal(LINKS.register)}
            >
              <Text style={styles.miniBtnText}>Register</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.push('/(tabs)/info')}
            style={({ pressed }) => [styles.navCard, pressed && { opacity: 0.92 }]}
          >
            <View style={styles.navIcon}>
              <Info size={22} color={colors.brand} strokeWidth={2} />
            </View>
            <View style={styles.navCopy}>
              <Text style={styles.navTitle}>Info</Text>
              <Text style={styles.navSub}>Contacts, participants & resources</Text>
            </View>
            <ChevronRight size={20} color={colors.inkMuted} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  scroll: { paddingBottom: 28 },
  hero: {
    backgroundColor: colors.brand,
    paddingHorizontal: 22,
    // paddingTop set dynamically so brand color fills under the notch
    paddingBottom: 44,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  logoMain: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
  },
  heroEyebrow: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 8,
  },
  heroOrg: {
    marginTop: 14,
    color: colors.goldSoft,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  heroTheme: {
    marginTop: 12,
    color: 'rgba(255,255,255,0.88)',
    fontSize: 13,
    lineHeight: 20,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 18 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  chipMuted: { backgroundColor: 'rgba(0,0,0,0.1)' },
  chipText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  body: { paddingHorizontal: 16, marginTop: -20, gap: 14 },
  navCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(134, 52, 25, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navCopy: { flex: 1 },
  navTitle: { fontSize: 16, fontWeight: '700', color: colors.ink },
  navSub: { fontSize: 12, color: colors.inkMuted, marginTop: 2 },
  row3: { flexDirection: 'row', gap: 8 },
  miniBtn: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 12,
    alignItems: 'center',
  },
  miniBtnText: { fontSize: 12, fontWeight: '700', color: colors.brand },
})
