import { Feather } from '@expo/vector-icons';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect, useRef } from 'react';
import { COLORS, FONTS } from '../constants/theme';

const MENU_ITEMS = [
  { id: 'clases', label: 'CLASES' },
  { id: 'tareas', label: 'TAREAS' },
  { id: 'notificaciones', label: 'NOTIFICACIONES' },
  { id: 'configuracion', label: 'CONFIGURACIÓN' },
  { id: 'cerrar', label: 'CERRAR SESIÓN' },
];

const DRAWER_WIDTH_RATIO = 0.72;

export default function SidebarMenu({ visible, onClose, onItemPress }) {
  const screenWidth = Dimensions.get('window').width;
  const drawerWidth = screenWidth * DRAWER_WIDTH_RATIO;
  const slideAnim = useRef(new Animated.Value(-drawerWidth)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -drawerWidth,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible, drawerWidth, slideAnim]);

  if (!visible) {
    return null;
  }

  const handleItemPress = (itemId) => {
    onClose(); // Cierra el menú siempre primero para la animación
    
    if (onItemPress) {
      onItemPress(itemId); // Le pasa el ID al App.js para que él decida qué hacer
    }
  };

  return (
    <Modal transparent visible animationType="none" onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable style={styles.overlay} onPress={onClose} />

        <Animated.View
          style={[
            styles.drawer,
            { width: drawerWidth, transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={styles.drawerHeader}>
            <Feather name="menu" size={24} color={COLORS.black} />
            <Text style={styles.menuTitle}>MENÚ</Text>
          </View>

          <View style={styles.menuList}>
            {MENU_ITEMS.map((item) => (
              <Pressable
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleItemPress(item.id)}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  drawer: {
    backgroundColor: COLORS.drawer,
    height: '100%',
    paddingTop: 56,
    paddingHorizontal: 28,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
    gap: 14,
  },
  menuTitle: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    color: COLORS.black,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1,
  },
  menuList: {
    gap: 28,
  },
  menuItem: {
    paddingVertical: 4,
  },
  menuItemText: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    color: COLORS.black,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
