import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BORDERS, COLORS, FONTS, RADIUS } from '../constants/theme';
import { SCHOOL_DAYS } from '../utils/dayHelpers';
import { validateCleanText } from '../utils/profanity';
import { formatTimeInput, isValidTime24, timeToMinutes } from '../utils/time';

function TimeField({ label, value, onChange, error }) {
  const handleChange = (text) => {
    onChange(formatTimeInput(text));
  };

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        placeholder="HH:MM"
        placeholderTextColor="#999"
        keyboardType="number-pad"
        maxLength={5}
      />
      <View style={styles.underline} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

function DayPicker({ value, onSelect, error }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>DÍA DE LA SEMANA</Text>
      <Pressable style={styles.daySelector} onPress={() => setOpen(true)}>
        <Text style={styles.dayValue}>{value || 'SELECCIONAR DÍA'}</Text>
        <Text style={styles.chevron}>▼</Text>
      </Pressable>
      <View style={styles.underline} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <View style={styles.modalContent}>
            {SCHOOL_DAYS.map((day) => (
              <Pressable
                key={day}
                style={styles.dayOption}
                onPress={() => {
                  onSelect(day);
                  setOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.dayOptionText,
                    value === day && styles.dayOptionSelected,
                  ]}
                >
                  {day}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function ClassForm({
  defaultDay,
  initialData = null,
  onCancel,
  onSubmit,
}) {
  const isEditing = Boolean(initialData);
  const initialMode = initialData?.isRecess ? 'recess' : 'class';

  const [mode, setMode] = useState(initialMode);
  const [subject, setSubject] = useState(
    initialData?.isRecess ? '' : (initialData?.subject ?? ''),
  );
  const [teacher, setTeacher] = useState(initialData?.teacher ?? '');
  const [startTime, setStartTime] = useState(initialData?.startTime ?? '');
  const [endTime, setEndTime] = useState(initialData?.endTime ?? '');
  const [day, setDay] = useState(initialData?.day ?? defaultDay);
  const [errors, setErrors] = useState({});

  const switchMode = (nextMode) => {
    if (isEditing) return;

    setMode(nextMode);
    setErrors({});

    if (nextMode === 'recess') {
      setSubject('');
      setTeacher('');
    } else {
      setSubject('');
      setTeacher('');
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (mode === 'class') {
      const subjectError = validateCleanText(subject, 'Materia');
      if (subjectError) nextErrors.subject = subjectError;

      const teacherError = validateCleanText(teacher, 'Nombre del docente');
      if (teacherError) nextErrors.teacher = teacherError;

      if (!SCHOOL_DAYS.includes(day)) {
        nextErrors.day = 'Seleccione un día de Lunes a Viernes.';
      }
    }

    if (!isValidTime24(startTime)) {
      nextErrors.startTime = 'Hora de inicio inválida. Use formato 24h (HH:MM).';
    }

    if (!isValidTime24(endTime)) {
      nextErrors.endTime =
        'Hora de finalización inválida. Use formato 24h (HH:MM).';
    }

    if (
      isValidTime24(startTime) &&
      isValidTime24(endTime) &&
      timeToMinutes(endTime) <= timeToMinutes(startTime)
    ) {
      nextErrors.endTime =
        'La hora de finalización debe ser posterior al inicio.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      mode,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
    };

    if (mode === 'class') {
      payload.subject = subject;
      payload.teacher = teacher;
      payload.day = day;
    }

    onSubmit(payload);
  };

  const handleSubjectChange = (text) => {
    if (text.length <= 50) setSubject(text);
  };

  const handleTeacherChange = (text) => {
    if (text.length <= 50) setTeacher(text);
  };

  const showTabs = !isEditing;
  const showClassFields = mode === 'class' && !isEditing;
  const showClassFieldsEditing = mode === 'class' && isEditing;
  const showRecessFields = mode === 'recess' && !isEditing;
  const showDayPicker = mode === 'class';

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {showTabs ? (
        <View style={styles.tabsRow}>
          <Pressable
            style={[styles.tab, mode === 'class' && styles.tabActive]}
            onPress={() => switchMode('class')}
          >
            <Text style={[styles.tabText, mode === 'class' && styles.tabTextActive]}>
              CLASE
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, mode === 'recess' && styles.tabActive]}
            onPress={() => switchMode('recess')}
          >
            <Text style={[styles.tabText, mode === 'recess' && styles.tabTextActive]}>
              CREAR RECESO
            </Text>
          </Pressable>
        </View>
      ) : null}

      {showClassFields || showClassFieldsEditing ? (
        <>
          <View style={styles.field}>
            <Text style={styles.label}>MATERIA</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={handleSubjectChange}
              maxLength={50}
              placeholderTextColor="#999"
            />
            <View style={styles.underline} />
            {errors.subject ? (
              <Text style={styles.errorText}>{errors.subject}</Text>
            ) : null}
            <Text style={styles.hint}>{subject.length}/50</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>NOMBRE DEL DOCENTE</Text>
            <TextInput
              style={styles.input}
              value={teacher}
              onChangeText={handleTeacherChange}
              maxLength={50}
              placeholderTextColor="#999"
            />
            <View style={styles.underline} />
            {errors.teacher ? (
              <Text style={styles.errorText}>{errors.teacher}</Text>
            ) : null}
            <Text style={styles.hint}>{teacher.length}/50</Text>
          </View>
        </>
      ) : null}

      {showRecessFields ? (
        <View style={styles.field}>
          <Text style={styles.label}>TÍTULO</Text>
          <Text style={styles.lockedValue}>RECESO</Text>
          <View style={styles.underline} />
        </View>
      ) : null}

      <TimeField
        label="HORA DE INICIO"
        value={startTime}
        onChange={setStartTime}
        error={errors.startTime}
      />

      <TimeField
        label="HORA DE FINALIZACIÓN"
        value={endTime}
        onChange={setEndTime}
        error={errors.endTime}
      />

      {showDayPicker ? (
        <DayPicker value={day} onSelect={setDay} error={errors.day} />
      ) : null}

      <View style={styles.buttonsRow}>
        <Pressable style={styles.actionButton} onPress={onCancel}>
          <Text style={styles.buttonText}>CANCELAR</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isEditing ? 'GUARDAR' : 'CREAR'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  tab: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.pill,
    paddingVertical: 12,
    alignItems: 'center',
    ...BORDERS.thin,
  },
  tabActive: {
    backgroundColor: COLORS.terracotta,
  },
  tabText: {
    fontFamily: FONTS.serif,
    fontSize: 12,
    color: COLORS.black,
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
  },
  tabTextActive: {
    color: COLORS.white,
  },
  field: {
    marginBottom: 28,
  },
  label: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    color: COLORS.black,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  input: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    color: COLORS.black,
    paddingVertical: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  lockedValue: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    color: COLORS.black,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '700',
    paddingVertical: 8,
  },
  underline: {
    height: 1,
    backgroundColor: COLORS.black,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  daySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  dayValue: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    color: COLORS.black,
    textTransform: 'uppercase',
    flex: 1,
    textAlign: 'center',
  },
  chevron: {
    fontSize: 12,
    color: COLORS.black,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.card,
    paddingVertical: 12,
    ...BORDERS.thin,
  },
  dayOption: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  dayOptionText: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    color: COLORS.black,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  dayOptionSelected: {
    fontWeight: '700',
    color: COLORS.terracotta,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.button,
    paddingVertical: 16,
    alignItems: 'center',
    ...BORDERS.thin,
  },
  buttonText: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    color: COLORS.black,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
