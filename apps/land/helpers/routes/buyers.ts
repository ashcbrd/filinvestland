export const BUYERS = { url: "/buyers", name: "Buyers", directory: ["Buyers"] };
const CALCULATOR = {
  url: `${BUYERS.url}/home-loan-calculator`,
  name: "Home Loan Calculator",
  directory: [...BUYERS.directory, "Home Loan Calculator"],
};
const ONLINE_APPOINTMENT = {
  url: `/contact-us`,
  name: "Online Appointment",
  directory: [...BUYERS.directory, "Online Appointment"],
};
const FILPAY = {
  url: `${BUYERS.url}/filpay`,
  name: "FilPay",
  directory: [...BUYERS.directory, "FilPay"],
};
const MYHOME = {
  url: `/myhome`,
  name: "MyHome",
  directory: [...BUYERS.directory, "MyHome"],
};
const BUYERS_ROUTES = {
  ...BUYERS,
  CALCULATOR,
  ONLINE_APPOINTMENT,
  FILPAY,
  MYHOME,
};
export const BUYERS_SUB_ROUTES = [
  CALCULATOR,
  ONLINE_APPOINTMENT,
  FILPAY,
  MYHOME,
];
export default BUYERS_ROUTES;
