import { StyleSheet, View } from 'react-native';
import ClassForm from '../components/ClassForm';
import Header from '../components/Header';
import { COLORS } from '../constants/theme';
import { getSchoolDayTitle } from '../utils/dayHelpers';

function getFormTitle(editingItem) {
  if (!editingItem) {
    return 'ASIGNAR CLASE';
  }
  if (editingItem.isRecess) {
    return 'EDITAR RECESO';
  }
  return 'EDITAR CLASE';
}

export default function AssignClassScreen({
  onMenuPress,
  onCancel,
  onSubmit,
  editingItem = null,
}) {
  const defaultDay = getSchoolDayTitle();
  const formTitle = getFormTitle(editingItem);

  return (
    <View style={styles.container}>
      <Header
        title={formTitle}
        showTitle
        showNotifications={false}
        titleLarge
        onMenuPress={onMenuPress}
      />
      <ClassForm
        defaultDay={defaultDay}
        initialData={editingItem}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
