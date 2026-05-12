import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Menu, Plus } from 'lucide-react-native';
import { COLORS, RADIUS } from '../constants/theme';

export function AppHeader({ titlePill, onMenuPress, showListAdd, onAddPress }) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Menú"
        onPress={onMenuPress}
        style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
      >
        <Menu size={22} color={COLORS.text} strokeWidth={2.5} />
      </Pressable>

      <View style={styles.center}>
        {titlePill ? (
          <View style={styles.titlePill}>
            <Text style={styles.titlePillText}>{titlePill}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.rightSlot}>
        {showListAdd ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Asignar tarea"
            onPress={onAddPress}
            style={({ pressed }) => [styles.iconHit, pressed && styles.pressed]}
          >
            <Plus size={28} color={COLORS.text} strokeWidth={2.5} />
          </Pressable>
        ) : (
          <View style={styles.iconHit} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    minHeight: 52,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.menuButton,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  titlePill: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: RADIUS.pill,
    maxWidth: '100%',
  },
  titlePillText: {
    color: COLORS.text,
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.6,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  rightSlot: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconHit: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
