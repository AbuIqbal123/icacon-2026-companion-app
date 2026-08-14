import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native'
import { colors } from '../theme/colors'

export function Screen({
  children,
  style,
}: {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}) {
  return <View style={[styles.screen, style]}>{children}</View>
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}) {
  return <View style={[styles.card, style]}>{children}</View>
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionLabel}>{children}</Text>
}

export function PrimaryButton({
  label,
  onPress,
  variant = 'brand',
}: {
  label: string
  onPress: () => void
  variant?: 'brand' | 'maroon' | 'outline'
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        variant === 'brand' && styles.btnBrand,
        variant === 'maroon' && styles.btnMaroon,
        variant === 'outline' && styles.btnOutline,
        pressed && styles.btnPressed,
      ]}
    >
      <Text
        style={[
          styles.btnText,
          variant === 'outline' && { color: colors.brand },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}

export function LinkRow({
  label,
  onPress,
  hint = 'Open',
}: {
  label: string
  onPress: () => void
  hint?: string
}) {
  return (
    <Pressable onPress={onPress} style={styles.linkRow}>
      <Text style={styles.linkLabel}>{label}</Text>
      <Text style={styles.linkHint}>{hint}</Text>
    </Pressable>
  )
}

export function Body({
  children,
  muted,
  style,
}: {
  children: React.ReactNode
  muted?: boolean
  style?: StyleProp<TextStyle>
}) {
  return (
    <Text style={[styles.body, muted && styles.muted, style]}>{children}</Text>
  )
}

export function Title({
  children,
  style,
}: {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
}) {
  return <Text style={[styles.title, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.brand,
    marginBottom: 8,
  },
  btn: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  btnBrand: { backgroundColor: colors.brand },
  btnMaroon: { backgroundColor: colors.maroon },
  btnOutline: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnPressed: { opacity: 0.88 },
  btnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  linkLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.brand,
    flex: 1,
    paddingRight: 8,
  },
  linkHint: {
    fontSize: 12,
    color: colors.inkMuted,
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.ink,
  },
  muted: {
    color: colors.inkMuted,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
  },
})
