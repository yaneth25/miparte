const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function isValidTime24(value) {
  return TIME_REGEX.test(value.trim());
}

export function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function getNowMinutes(date = new Date()) {
  return date.getHours() * 60 + date.getMinutes();
}

export function formatTimeRange(start, end) {
  return `${start}-${end}`;
}

export function formatTimeInput(text) {
  const digits = text.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) {
    return digits;
  }
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

export function compareScheduleItems(a, b) {
  return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
}

export function getClassStatus(classes, nowMinutes) {
  let currentId = null;
  let nextId = null;

  const sorted = [...classes].sort(compareScheduleItems);

  for (const item of sorted) {
    const start = timeToMinutes(item.startTime);
    const end = timeToMinutes(item.endTime);

    if (nowMinutes >= start && nowMinutes < end) {
      currentId = item.id;
      break;
    }
  }

  if (currentId) {
    const currentIndex = sorted.findIndex((c) => c.id === currentId);
    const afterCurrent = sorted
      .slice(currentIndex + 1)
      .find((c) => !c.isRecess);
    if (afterCurrent) {
      nextId = afterCurrent.id;
    }
  } else {
    const upcoming = sorted.find(
      (c) => timeToMinutes(c.startTime) > nowMinutes && !c.isRecess,
    );
    if (upcoming) {
      nextId = upcoming.id;
    }
  }

  return { currentId, nextId };
}
