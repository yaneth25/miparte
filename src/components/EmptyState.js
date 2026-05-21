import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BORDERS, COLORS, FONTS, RADIUS } from '../constants/theme';

export default function EmptyState({ onAssignPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.messageBox}>
        <Text style={styles.message}>NO HAY CLASES ASIGNADAS</Text>
      </View>

      <Pressable style={styles.plusButton} onPress={onAssignPress}>
        <Feather name="plus" size={28} color={COLORS.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBox: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.card,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    ...BORDERS.thin,
  },
  message: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 26,
  },
  plusButton: {
    position: 'absolute',
    bottom: 40,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
