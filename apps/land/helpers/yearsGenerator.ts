export default function generateYearsArray() {
  const limitYear = 2008;
  const currentYear = new Date().getFullYear();
  const yearsArray = [];

  for (let year = currentYear; year >= limitYear; year--) {
    yearsArray.push(year.toString());
  }

  return yearsArray;
}
