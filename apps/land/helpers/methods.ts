export const round = (val: number, n: number = 2) => {
  return Math.floor(val * Math.pow(10, n) + 1e-8) / Math.pow(10, n);
};

export const getMonthStr = (month: number) => {
  const arr = [
    "Jan",
    "Fab",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return arr[month];
};
