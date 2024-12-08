export const getMonthDays = (date: Date) => {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { monthStart, monthEnd };
  };

  

export const generateDaysArray = (start: Date, end: Date) => {
    const days = [];
    for (let day = start.getDate(); day <= end.getDate(); day++) {
      const date = new Date(start.getFullYear(), start.getMonth(), day);
      days.push(date);
    }
    return days;
};

export const getRoundedDate = (date: Date) => {
  const roundedMinutes = Math.ceil(date.getMinutes() / 30) * 30; // Round up to the next 30-minute mark
  if (roundedMinutes === 60) {
    date.setHours(date.getHours() + 1, 0, 0, 0); // Increment the hour and set minutes to 0
  } else {
    date.setMinutes(roundedMinutes, 0, 0); // Set the rounded minutes and reset seconds/milliseconds
  }
  return date;
};

export const getWeekDays = (date: Date) => {
  const startOfWeek = new Date(date); // Use the current date as the start of the week
  startOfWeek.setDate(date.getDate()); // Set the start date to today (no adjustments needed)

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i); // Loop through the next 7 days
    return day;
  });
};

  // Generate hours for the left sidebar (AM/PM format)
export  const generateHours = () => {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i % 12 === 0 ? 12 : i % 12; // Format for 12-hour time
      const period = i < 12 ? "AM" : "PM";
      return `${hour < 10 ? `0${hour}` : hour}:00 ${period}`;
    });
  };