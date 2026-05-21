import { compareScheduleItems } from './time';

function isRecessForDay(item, dayKey) {
  if (!item.isRecess) return false;
  return item.appliesToAllDays === true || item.day === dayKey;
}

export function buildDaySchedule(classes, dayKey) {
  const dayItems = classes.filter(
    (c) => (!c.isRecess && c.day === dayKey) || isRecessForDay(c, dayKey),
  );
  return dayItems.sort(compareScheduleItems);
}

export function createClassEntry({ subject, teacher, startTime, endTime, day }) {
  return {
    id: `class-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    subject: subject.trim().toUpperCase(),
    teacher: teacher.trim().toUpperCase(),
    startTime,
    endTime,
    day,
    isRecess: false,
  };
}

export function createRecessEntry({ startTime, endTime }) {
  return {
    id: `recess-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    subject: 'RECESO',
    teacher: '',
    startTime,
    endTime,
    isRecess: true,
    appliesToAllDays: true,
  };
}

export function updateScheduleEntry(existing, formData, mode) {
  if (mode === 'recess') {
    return {
      ...existing,
      subject: 'RECESO',
      teacher: '',
      startTime: formData.startTime.trim(),
      endTime: formData.endTime.trim(),
      isRecess: true,
      appliesToAllDays: true,
    };
  }

  return {
    ...existing,
    subject: formData.subject.trim().toUpperCase(),
    teacher: formData.teacher.trim().toUpperCase(),
    startTime: formData.startTime.trim(),
    endTime: formData.endTime.trim(),
    day: formData.day,
    isRecess: false,
    appliesToAllDays: false,
  };
}
