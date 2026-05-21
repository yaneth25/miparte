const WEEKDAYS = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];

const SCHOOL_DAYS = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'];

export function getCurrentWeekdayName(date = new Date()) {
  return WEEKDAYS[date.getDay()];
}

export function getSchoolDayTitle(date = new Date()) {
  const dayIndex = date.getDay();
  if (dayIndex === 0 || dayIndex === 6) {
    return 'LUNES';
  }
  return WEEKDAYS[dayIndex];
}

export function getSchoolDayKey(date = new Date()) {
  return getSchoolDayTitle(date);
}

export { SCHOOL_DAYS, WEEKDAYS };
