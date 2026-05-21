import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
  Modal,
} from 'react-native';
import { ChevronDown, ChevronUp, X, Pencil } from 'lucide-react-native'; // Importamos Pencil
import { COLORS, RADIUS } from '../constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function TaskCard({ task, onDelete, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((v) => !v);
  };

  const confirmDelete = () => {
    onDelete(task.id);
    setShowDeleteModal(false);
  };

  return (
    <View style={styles.card}>
      {/* --- MODAL DE CONFIRMACIÓN DE ELIMINAR --- */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>¿SEGURO QUE QUIERES ELIMINAR LA TAREA?</Text>
            <Text style={styles.alertSubtitle}>RECUERDA QUE PUEDES CREAR UNA TAREA DESPUÉS</Text>
            <View style={styles.modalButtons}>
              <Pressable onPress={() => setShowDeleteModal(false)} style={styles.modalBtn}>
                <Text style={styles.modalBtnText}>CANCELAR</Text>
              </Pressable>
              <Pressable onPress={confirmDelete} style={styles.modalBtn}>
                <Text style={styles.modalBtnText}>ELIMINAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- BOTONES SUPERIORES (EDITAR Y ELIMINAR) --- */}
      <View style={styles.topActions}>
        <Pressable 
          onPress={() => onEdit(task)} 
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <Pencil size={18} color={COLORS.text} strokeWidth={2.5} />
        </Pressable>
        
        <Pressable 
          onPress={() => setShowDeleteModal(true)} 
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <X size={20} color={COLORS.text} strokeWidth={2.5} />
        </Pressable>
      </View>

      {/* --- CONTENIDO DE LA TARJETA --- */}
      <View style={styles.contentCenter}>
        <Text style={styles.cardTitle}>{task.title.toUpperCase()}</Text>
        <Text style={styles.cardSubject}>{task.subject.toUpperCase()}</Text>
        <Text style={styles.cardDate}>FECHA DE ENTREGA: {task.dueDate || '—'}</Text>
      </View>

      {expanded && <Text style={styles.description}>{task.description}</Text>}

      {/* --- BOTÓN EXPANDIR --- */}
      <Pressable onPress={toggle} style={styles.chevronBtn}>
        {expanded ? (
          <ChevronUp size={22} color={COLORS.text} strokeWidth={2.5} />
        ) : (
          <ChevronDown size={22} color={COLORS.text} strokeWidth={2.5} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.card,
    padding: 20,
    paddingTop: 15,
    marginBottom: 14,
    position: 'relative',
    minHeight: 120,
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginBottom: 5,
  },
  iconBtn: {
    padding: 5,
  },
  contentCenter: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  cardTitle: {
    color: COLORS.text,
    fontWeight: '800',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2,
  },
  cardSubject: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 8,
    opacity: 0.7,
  },
  cardDate: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 11,
  },
  description: {
    color: COLORS.text,
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '500',
    paddingBottom: 20,
  },
  chevronBtn: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  pressed: { opacity: 0.7 },
  // Estilos del Modal (Mismos de la imagen)
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  alertBox: { width: '85%', backgroundColor: '#FDFCF0', borderRadius: 35, padding: 30, alignItems: 'center' },
  alertTitle: { fontSize: 18, fontWeight: '900', color: '#222', textAlign: 'center', marginBottom: 10 },
  alertSubtitle: { fontSize: 11, fontWeight: '700', color: '#666', textAlign: 'center', marginBottom: 25 },
  modalButtons: { flexDirection: 'row', gap: 15 },
  modalBtn: { borderWidth: 1.5, borderColor: '#333', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8, backgroundColor: '#E8D9C0' },
  modalBtnText: { fontSize: 11, fontWeight: '900', color: '#333' },
});
