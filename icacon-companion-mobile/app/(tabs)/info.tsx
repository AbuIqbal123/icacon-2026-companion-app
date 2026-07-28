import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import {
  BookOpen,
  Calendar,
  ChevronRight,
  FileText,
  Globe,
  MapPin,
  Shield,
  type LucideIcon,
  UserPlus,
} from 'lucide-react-native'
import { router } from 'expo-router'
import { EVENT_META, LINKS, OFFLINE_INFO } from '@/src/data/events'
import { LOGOS } from '@/src/data/logos'
import { colors } from '@/src/theme/colors'
import { openExternal, openMail, openTel, openVenuePicker } from '@/src/lib/linking'

function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.sectionLabel}>{children}</Text>
}

function Group({ children }: { children: React.ReactNode }) {
  return <View style={styles.group}>{children}</View>
}

function Divider({ inset = 60 }: { inset?: number }) {
  return <View style={[styles.divider, { marginLeft: inset }]} />
}

function IconWell({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <View style={styles.iconWell}>
      <Icon size={17} color={colors.brand} strokeWidth={2.2} />
    </View>
  )
}

/** Resources only — icons earn their place as navigation affordances */
function NavRow({
  icon,
  label,
  onPress,
  last,
}: {
  icon: LucideIcon
  label: string
  onPress: () => void
  last?: boolean
}) {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.navRow, pressed && styles.pressed]}
      >
        <IconWell icon={icon} />
        <Text style={styles.navLabel}>{label}</Text>
        <ChevronRight size={18} color={colors.inkMuted} />
      </Pressable>
      {!last ? <Divider /> : null}
    </>
  )
}

/**
 * Contact card — not a settings list.
 * Name + role, then plain tappable phone/email (no icon wells, no chevrons).
 */
function ContactCard({
  name,
  role,
  phones,
  email,
}: {
  name: string
  role: string
  phones: string[]
  email?: string
}) {
  return (
    <View style={styles.contactCard}>
      <Text style={styles.contactName}>{name}</Text>
      <Text style={styles.contactRole}>{role}</Text>
      <View style={styles.contactLinks}>
        {phones.map((p) => (
          <Pressable
            key={p}
            onPress={() => {
              void openTel(p)
            }}
            hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            style={({ pressed }) => pressed && styles.contactLinkPressed}
          >
            <Text style={styles.contactPhone}>{p}</Text>
          </Pressable>
        ))}
        {email ? (
          <Pressable
            onPress={() => {
              void openMail(email)
            }}
            hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            style={({ pressed }) => pressed && styles.contactLinkPressed}
          >
            <Text style={styles.contactEmail}>{email}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  )
}

export default function InfoScreen() {
  const s = OFFLINE_INFO.secretariat
  const r = OFFLINE_INFO.registrationContact

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Info</Text>

        <View style={styles.quickRow}>
          <Pressable
            style={({ pressed }) => [styles.quickTile, pressed && styles.pressed]}
            onPress={() => openExternal(LINKS.website)}
          >
            <View style={styles.quickIcon}>
              <Globe size={20} color={colors.brand} />
            </View>
            <Text style={styles.quickLabel}>Website</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.quickTile, pressed && styles.pressed]}
            onPress={() => router.push('/pdf/brochure')}
          >
            <View style={styles.quickIcon}>
              <FileText size={20} color={colors.brand} />
            </View>
            <Text style={styles.quickLabel}>Brochure</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.quickTile, pressed && styles.pressed]}
            onPress={() => openExternal(LINKS.register)}
          >
            <View style={styles.quickIcon}>
              <UserPlus size={20} color={colors.brand} />
            </View>
            <Text style={styles.quickLabel}>Register</Text>
          </Pressable>
        </View>

        <SectionLabel>Resources</SectionLabel>
        <Group>
          <NavRow
            icon={Calendar}
            label="Day 1 programme"
            onPress={() => router.push('/pdf/day1')}
          />
          <NavRow
            icon={Calendar}
            label="Day 2 programme"
            onPress={() => router.push('/pdf/day2')}
          />
          <NavRow
            icon={BookOpen}
            label="Workshops"
            onPress={() => openExternal(LINKS.workshops)}
          />
          <NavRow
            icon={MapPin}
            label="Venue"
            onPress={openVenuePicker}
            last
          />
        </Group>

        <SectionLabel>Secretariat</SectionLabel>
        <Group>
          <ContactCard
            name="Prof. Obaid A Siddiqui"
            role="Organising Secretary"
            phones={s.phones}
            email={s.email}
          />
          <View style={styles.contactDivider} />
          <ContactCard
            name={s.coSecretary.name}
            role={s.coSecretary.role}
            phones={[s.coSecretary.phone]}
          />
        </Group>

        <SectionLabel>Registration</SectionLabel>
        <Group>
          <ContactCard
            name={r.name}
            role={r.role}
            phones={[r.phone]}
            email={r.email}
          />
        </Group>

        <SectionLabel>Hosts</SectionLabel>
        <Group>
          <View style={styles.hostsRow}>
            <View style={styles.hostItem}>
              <Image source={LOGOS.icacon} style={styles.hostLogo} />
              <Text style={styles.hostLabel}>ICA</Text>
            </View>
            <View style={styles.hostItem}>
              <Image source={LOGOS.amu} style={styles.hostLogo} />
              <Text style={styles.hostLabel}>AMU</Text>
            </View>
          </View>
        </Group>

        <SectionLabel>Good to know</SectionLabel>
        <Group>
          <View style={styles.notesBlock}>
            {OFFLINE_INFO.tips.map((tip) => (
              <Text key={tip} style={styles.noteText}>
                {tip}
              </Text>
            ))}
          </View>
        </Group>

        <SectionLabel>Legal</SectionLabel>
        <Group>
          <NavRow
            icon={Shield}
            label="Privacy policy"
            onPress={() => openExternal(LINKS.privacy)}
            last
          />
        </Group>

        <Text style={styles.footer}>{EVENT_META.organisedBy}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.5,
    marginBottom: 18,
  },
  sectionLabel: {
    marginTop: 22,
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '600',
    color: colors.inkMuted,
  },
  group: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  pressed: {
    backgroundColor: colors.surface,
  },

  quickRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickTile: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 8,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(134, 52, 25, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.ink,
  },

  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
    minHeight: 52,
  },
  iconWell: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(134, 52, 25, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.ink,
  },

  // Contact — business-card, not settings rows
  contactCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  contactDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 16,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  contactRole: {
    marginTop: 3,
    fontSize: 14,
    color: colors.inkMuted,
  },
  contactLinks: {
    marginTop: 14,
    gap: 10,
  },
  contactLinkPressed: {
    opacity: 0.5,
  },
  contactPhone: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.ink,
    paddingVertical: 2,
  },
  contactEmail: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.ink,
    paddingVertical: 2,
  },

  hostsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  hostItem: {
    alignItems: 'center',
    gap: 8,
    minWidth: 72,
  },
  hostLogo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
  },
  hostLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.inkMuted,
  },

  // Quiet notes — no bullets, no fake list chrome
  notesBlock: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.ink,
  },

  footer: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 16,
    color: colors.inkMuted,
    paddingHorizontal: 16,
  },
})
