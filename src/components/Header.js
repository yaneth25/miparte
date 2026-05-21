import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BORDERS, COLORS, FONTS, RADIUS } from '../constants/theme';

export default function Header({
  title,
  showTitle = true,
  showNotifications = true,
  titleLarge = false,
  onMenuPress,
  onNotificationsPress,
}) {
  return (
    <View style={styles.wrapper}>
      <Pressable onPress={onMenuPress} style={styles.iconButton} hitSlop={12}>
        <Feather name="menu" size={24} color={COLORS.black} />
      </Pressable>

      {showTitle && title ? (
        <View style={[styles.titleContainer, titleLarge && styles.titleContainerLarge]}>
          <Text
            style={[styles.title, titleLarge && styles.titleLarge]}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      ) : (
        <View style={styles.titleSpacer} />
      )}

      {showNotifications ? (
        <Pressable
          onPress={onNotificationsPress}
          style={styles.iconButton}
          hitSlop={12}
        >
          <Feather name="bell" size={22} color={COLORS.black} />
        </Pressable>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.headerPill,
    borderRadius: RADIUS.icon,
    alignItems: 'center',
    justifyContent: 'center',
    ...BORDERS.thin,
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: COLORS.headerPill,
    borderRadius: RADIUS.card,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    ...BORDERS.thin,
  },
  titleContainerLarge: {
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  titleSpacer: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 15,
    letterSpacing: 1,
    color: COLORS.black,
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
  },
  titleLarge: {
    fontSize: 20,
    letterSpacing: 0.8,
    lineHeight: 26,
  },
});
