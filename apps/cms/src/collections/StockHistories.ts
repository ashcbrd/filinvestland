import { CollectionConfig } from "payload/types";
import { StockHistory } from "../payload-types";
import payload from "payload";
import { isVisible } from "../access/isAdminOrEditor";

export const getStockInformationBySymbol = async (
  date: string,
  symbol: string
): Promise<StockHistory> => {
  const response = await fetch(
    `${process.env.PSE_URL}/stocks/${symbol}.${date}.json`
  );

  if (response.ok) {
    let data = await response.json();
    // if(!data.as_of || data.as_of == "null") throw "stock fetch error"
    let asOf = new Date(data.as_of);
    data = data.stock[0];
    const stock: StockHistory = {
      name: data.name,
      currency: data.price.currency,
      amount: data.price.amount,
      percent_change:
        data.percent_change == null ? 0 : Number(data.percent_change),
      volume: data.volume,
      symbol: data.symbol,
      date: asOf.toString(),
      id: "",
      updatedAt: "",
      createdAt: "",
    };
    return stock;
  } else throw "stock fetch error";
};

export const getStockHistory = async (from: Date, to: Date, symbol: string) => {
  console.log(
    `load stock history from ${from.getFullYear()}-${
      from.getMonth() + 1
    }-${from.getDate()} to ${to.getFullYear()}-${
      to.getMonth() + 1
    }-${to.getDate()}`
  );
  const arr: string[] = [];
  while (from.getTime() <= to.getTime()) {
    arr.push(`${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`);
    from.setTime(from.getTime() + 24 * 60 * 60 * 1000);
  }
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    try {
      const stock = await getStockInformationBySymbol(arr[i], symbol);
      const exist = await payload.find({
        collection: "stock-histories",
        where: {
          date: {
            equals: stock.date,
          },
        },
      });
      if (exist.totalDocs) {
        updateStockHistory();
        break;
      } else {
        await payload.create({
          collection: "stock-histories",
          data: {
            ...stock,
            percent_change: stock.percent_change,
          },
        });
        console.log(`load stock history ${len} / ${i} ${arr[i]} ok`);
      }
    } catch (error) {
      error;
    }
  }
};

export const updateStockHistory = async () => {
  const lastStockArr = await payload.find({
    collection: "stock-histories",
    sort: "-date",
    limit: 1,
  });
  const current = new Date();
  const lastYear = new Date();
  lastYear.setTime(lastYear.getTime() - 365 * 24 * 3600000);
  const lastStock = lastStockArr.docs[0];
  if (lastStock) {
    let lastDate = new Date(lastStock.date);
    if (lastDate < lastYear) lastDate = lastYear;
    if (
      lastDate.getTime() < current.getTime() &&
      !(
        lastDate.getFullYear() == current.getFullYear() &&
        lastDate.getMonth() == current.getMonth() &&
        lastDate.getDate() == current.getDate()
      )
    ) {
      lastDate.setTime(lastDate.getTime() + 24 * 3600000);
      await getStockHistory(lastDate, current, process.env.COMPANY_SYMBOL);
    }
  } else {
    await getStockHistory(lastYear, current, process.env.COMPANY_SYMBOL);
  }
};

export const StockHistories: CollectionConfig = {
  slug: "stock-histories",
  admin: {
    useAsTitle: "title",
    group: "Filinvest",
    hidden: ({ user }) => {
      return !isVisible(
        "read",
        "stock-histories",
        "63db1aca51fa9424f93f6591",
        user
      );
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "currency",
      type: "text",
      required: true,
    },
    {
      name: "amount",
      type: "number",
      required: true,
    },
    {
      name: "percent_change",
      type: "number",
      required: true,
    },
    {
      name: "volume",
      type: "number",
      required: true,
    },
    {
      name: "symbol",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
  ],
};
