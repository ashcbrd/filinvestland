import qs from "qs";

// - Change - is usually the deviation from the price within a period. % based and usually is tracked and compared for the past 24 hrs
// - Close - the value of the stock ending the day
// - Open - the value of the stock starting the day
// - 52 week high is the tracked highest value in a year
// - 52 week low is the lowest value in a year

export interface StockHistory {
  name: string;
  currency: string;
  amount: number;
  percent_change: number;
  volume: number;
  symbol: string;
  date: Date;
}

export const getStock = async () => {
  const total = await fetch(`${process.env.PSE_URL}/stocks.json`, {
    cache: "no-store",
  });
  return total;
};

export const getStockBySymbol = async (
  date: Date,
  symbol: string
): Promise<StockHistory> => {
  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const response = await fetch(
    `${process.env.PSE_URL}/stocks/${symbol}.${dateString}.json`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) throw response.status;
  let data = await response.json();
  let asOf = new Date(data.as_of);
  data = data.stock?.[0];
  const stock: StockHistory = {
    name: data.name,
    currency: data.price.currency,
    amount: data.price.amount,
    percent_change: Number(data.percent_change) || 0,
    volume: data.volume,
    symbol: data.symbol,
    date: asOf,
  };
  return stock;
};

export const getHightestAndLowest = async (
  from: Date | undefined = undefined,
  to: Date | undefined = undefined
) => {
  if (from == undefined) {
    from = new Date();
    to = new Date();
    to.setTime(to.getTime() + 365 * 24 * 3600 * 1000);
  }
  var query = {
    or: [
      {
        date: {
          greater_than: from,
          less_than: to,
        },
      },
    ],
  };
  var strAsc = qs.stringify(
    {
      where: query,
      sort: "amount",
      limit: 1,
    },
    {
      addQueryPrefix: true,
    }
  );
  var strDesc = qs.stringify(
    {
      where: query,
      sort: "-amount",
      limit: 1,
    },
    {
      addQueryPrefix: true,
    }
  );
  let lowest = 0;
  let highest = 0;
  try {
    const response = await fetch(
      `${process.env.CMS_URL}/api/stock-histories${strAsc}`
    );
    let data = await response.json();
    if (data?.docs?.length) lowest = data.docs?.[0].amount;
  } catch (error) {
    console.log(error);
  }
  try {
    const response = await fetch(
      `${process.env.CMS_URL}/api/stock-histories${strDesc}`
    );
    let data = await response.json();
    if (data?.docs?.length) highest = data.docs?.[0].amount;
  } catch (error) {
    console.log(error);
  }
  return {
    lowest,
    highest,
  };
};

export const getLastStockInformation = async (
  symbol: string | undefined = undefined
): Promise<StockHistory> => {
  if (symbol == null) symbol = process.env.COMPANY_SYMBOL;
  let response = await fetch(`${process.env.PSE_URL}/stocks.json`, {
    method: "GET",
  });
  if (response.ok) {
    let data = await response.json();
    let asOf = new Date(data.as_of);
    data = data.stock?.find((item: StockHistory) => item.symbol == symbol);
    let stock: StockHistory = {
      name: data.name,
      currency: data.price.currency,
      amount: data.price.amount,
      percent_change: Number(data.percent_change) || 0,
      volume: data.volume,
      symbol: data.symbol,
      date: asOf,
    };
    return stock;
  } else {
    response = await fetch(`/api/stock-histories?sort=-date&limit=1`);
    let data = await response.json();
    let stock: StockHistory = data?.docs?.[0];
    stock = {
      ...stock,
      date: new Date(stock.date),
    };
    if (!stock) throw "load stock error";
    return stock;
  }
};
