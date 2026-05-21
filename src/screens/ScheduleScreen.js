import { Feather } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import ClassCard from '../components/ClassCard';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import { COLORS } from '../constants/theme';
import { getSchoolDayTitle } from '../utils/dayHelpers';
import { buildDaySchedule } from '../utils/schedule';
import { getClassStatus, getNowMinutes } from '../utils/time';

export default function ScheduleScreen({
  navigation, // 👈 1. Añadimos el prop de navegación aquí
  classes,
  onMenuPress,
  onAssignPress,
  onEditClass,
  onDeleteClass,
}) {
  const [now, setNow] = useState(new Date());
  const dayTitle = getSchoolDayTitle(now);
  const dayKey = dayTitle;

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);
   
  const scheduleItems = useMemo(
    () => buildDaySchedule(classes, dayKey),
    [classes, dayKey],
  );

  const { currentId, nextId } = useMemo(() => {
    return getClassStatus(scheduleItems, getNowMinutes(now));
  }, [scheduleItems, now]);

  const getStatusLabel = (item) => {
    if (item.isRecess) return null;
    if (item.id === currentId) return 'CLASE ACTUAL';
    if (item.id === nextId) return 'SIGUIENTE CLASE';
    return null;
  };

  // 👈 2. Nueva función para capturar el click del menú lateral
  const handleMenuPress = () => {
    if (onMenuPress) {
      // Le pasamos la navegación al archivo padre para que pueda mover las pantallas
      onMenuPress(navigation); 
    }
  };

  const handleNotifications = () => {
    Alert.alert('Notificaciones', 'Próximamente disponible.');
  };

  const handleDelete = (item) => {
    Alert.alert(
      'Eliminar',
      '¿Estás seguro de que deseas eliminar este elemento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDeleteClass(item.id),
        },
      ],
    );
  };

  if (scheduleItems.length === 0) {
    return (
      <View style={styles.container}>
        <Header
          showTitle={false}
          onMenuPress={handleMenuPress} // 👈 Cambiado por nuestra nueva función
          onNotificationsPress={handleNotifications}
        />
        <EmptyState onAssignPress={onAssignPress} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={dayTitle}
        showTitle
        onMenuPress={handleMenuPress} // 👈 Cambiado por nuestra nueva función
        onNotificationsPress={handleNotifications}
      />

      <FlatList
        data={scheduleItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ClassCard
            item={item}
            statusLabel={getStatusLabel(item)}
            onEdit={onEditClass}
            onDelete={handleDelete}
          />
        )}
      />

      <Pressable style={styles.fab} onPress={onAssignPress}>
        <Feather name="plus" size={28} color={COLORS.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 48,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
