import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BORDERS, COLORS, FONTS, RADIUS } from '../constants/theme';
import { formatTimeRange } from '../utils/time';

export default function ClassCard({
  item,
  statusLabel,
  onEdit,
  onDelete,
}) {
  const isRecess = item.isRecess;

  return (
    <View style={styles.wrapper}>
      <View style={styles.pillsRow}>
        <View style={styles.timePill}>
          <Text style={styles.timePillText}>
            {formatTimeRange(item.startTime, item.endTime)}
          </Text>
        </View>

        {!isRecess && statusLabel ? (
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>{statusLabel}</Text>
          </View>
        ) : null}
      </View>

      <View style={[styles.card, isRecess && styles.recessCard]}>
        {isRecess ? (
          <Text style={styles.recessTitle}>{item.subject}</Text>
        ) : (
          <>
            <Text style={styles.subject} numberOfLines={3}>
              {item.subject}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.teacher} numberOfLines={2}>
              {item.teacher}
            </Text>
          </>
        )}

        <View style={styles.actions}>
          <Pressable
            onPress={() => onEdit(item)}
            hitSlop={8}
            style={styles.actionButton}
          >
            <Feather name="edit-2" size={18} color={COLORS.black} />
          </Pressable>
          <Pressable
            onPress={() => onDelete(item)}
            hitSlop={8}
            style={styles.actionButton}
          >
            <Feather name="trash-2" size={18} color={COLORS.black} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 28,
    alignItems: 'center',
  },
  pillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
    marginBottom: -14,
    zIndex: 1,
  },
  timePill: {
    backgroundColor: COLORS.headerPill,
    borderRadius: RADIUS.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
    maxWidth: '48%',
    ...BORDERS.thin,
  },
  timePillText: {
    fontFamily: FONTS.serif,
    fontSize: 11,
    color: COLORS.black,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  statusPill: {
    backgroundColor: COLORS.statusPill,
    borderRadius: RADIUS.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
    maxWidth: '48%',
    ...BORDERS.thin,
  },
  statusPillText: {
    fontFamily: FONTS.serif,
    fontSize: 11,
    color: COLORS.white,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.card,
    paddingTop: 28,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    minHeight: 140,
    ...BORDERS.thin,
  },
  recessCard: {
    minHeight: 100,
    justifyContent: 'center',
    paddingTop: 24,
  },
  subject: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
    paddingHorizontal: 8,
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: COLORS.black,
    marginVertical: 12,
  },
  teacher: {
    fontFamily: FONTS.serif,
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  recessTitle: {
    fontFamily: FONTS.serif,
    fontSize: 26,
    color: COLORS.black,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 10,
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
});
