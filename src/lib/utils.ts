export function formatTime(timeDifference: Date) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const milliseconds = new Date(timeDifference).getTime();

  const relativeTime = Date.now() - milliseconds;

  const seconds = Math.round(relativeTime / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (seconds < 60) {
    return rtf.format(-seconds, "second");
  } else if (minutes < 60) {
    return rtf.format(-minutes, "minute");
  } else if (hours < 24) {
    return rtf.format(-hours, "hour");
  } else if (days < 7) {
    return rtf.format(-days, "day");
  } else if (weeks < 4) {
    return rtf.format(-weeks, "week");
  } else if (months < 12) {
    return rtf.format(-months, "month");
  } else {
    return rtf.format(-years, "year");
  }
}

export function formatDate(date: any) {
  const newDate = new Date(date).toLocaleDateString();
  return newDate;
}
