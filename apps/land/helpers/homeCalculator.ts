export function getContractPrice(tcp: number) {
  let vat = 0;
  const miscFees = tcp * 0.05; //5% MISCELLANEOUS FEES
  const bankFees = tcp * 0.04; // 4% BANK FEES
  if (tcp >= 3199200) {
    vat = tcp * 0.12;
  } // 12% VAT
  const contractPrice = tcp + miscFees + bankFees + vat;
  return {
    contractPrice,
    miscFees,
    bankFees,
    vat,
  };
}

export function getDownPayment(
  netTCP: number,
  downPaymentPercent: number,
  downPaymentTerm: number,
  reservationFee: number
) {
  const downPayment = netTCP * (downPaymentPercent / 100);
  const netDownPayment = downPayment - reservationFee;
  const monthlyDownPayment = netDownPayment / downPaymentTerm;
  return {
    reservationFee,
    downPaymentPercent,
    downPayment,
    netDownPayment,
    monthlyDownPayment,
  };
}

/* MONTHLY AMORTIZATION COMPUTATION
FORMULA IS X = LOAN ((rate*(1 + rate)^yearsToPay)/((1 + rate)^yearsToPay) - 1)
*/
export function getMonthlyAmortization(
  loan: number,
  rate: number,
  yearsToPay: number
) {
  let numerator = rate * (1 + rate) ** yearsToPay;
  let denominator = (1 + rate) ** yearsToPay - 1;
  return loan * (numerator / denominator);
}

//REQUIRED MONTHLY INCOME IS 70% OF THE MONTHLY AMORTIZATION
export function getRequiredMonthlyIncome(monthlyAmortization: number) {
  return monthlyAmortization / 0.3;
}

/* 
  CONDITION FOR THE RATE BASED ON NUMBER OF YEARS TO PAY
  5 YEARS TO PAY = 7.5% INDICATIVE INTEREST RATE
  10 YEARS TO PAY = 9.5% INDICATIVE INTEREST RATE
  15 YEARS TO PAY = 10% INDICATIVE INTEREST RATE
*/
export function getRate(yearsToPay: number) {
  let rate = 0;
  if (yearsToPay == 5) {
    rate = 7.25 / 100 / 12;
  }
  if (yearsToPay == 10) {
    rate = 7.375 / 100 / 12;
  }
  if (yearsToPay == 15) {
    rate = 8.25 / 100 / 12;
  }
  return {
    rate,
    yearsToPay,
  };
}

export function toCurrency(value: number) {
  return `₱${new Intl.NumberFormat("en-US").format(Math.trunc(value))}`;
}

export function toCurrencyComma(value: string) {
  return `${new Intl.NumberFormat("en-US").format(Math.trunc(Number(value)))}`;
}
