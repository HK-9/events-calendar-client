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
