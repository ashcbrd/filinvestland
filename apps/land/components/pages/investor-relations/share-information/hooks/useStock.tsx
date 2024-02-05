import { useEffect, useState } from "react";
import { getLastStockInformation } from "../../../../../services/PSE";
import {
  getHightestAndLowest,
  StockHistory,
} from "../../../../../services/PSE";
import { round } from "@/helpers/methods";

const useStock = () => {
  const [currentStock, setCurrentStock] = useState<StockHistory>({
    name: "FLINVESY",
    currency: "PHP",
    amount: 0,
    percent_change: 0,
    volume: 0,
    symbol: "FLI",
    date: new Date(),
  });

  const [highest, setHighest] = useState(0);
  const [lowest, setLowest] = useState(0);
  const [loading, setLoading] = useState<{
    highest: boolean;
    lowest: boolean;
    stock: boolean;
  }>({
    highest: true,
    lowest: true,
    stock: true,
  });
  const [open, setOpen] = useState(0);
  const [close, setClose] = useState(0);
  const [change, setChange] = useState(0);

  useEffect(() => {
    const main = async () => {
      let max = 50;
      const currentDate = new Date();
      const lastYear = new Date();
      try {
        lastYear.setTime(lastYear.getTime() - 365 * 24 * 60 * 60 * 1000);
        loading.highest = true;
        loading.lowest = true;
        setLoading({ ...loading });
        const hl = await getHightestAndLowest(lastYear, currentDate);
        loading.highest = false;
        loading.lowest = false;
        setLoading({ ...loading });
        setHighest(hl.highest);
        setLowest(hl.lowest);
      } catch (error) {
        loading.highest = false;
        loading.lowest = false;
        setLoading({ ...loading });
        console.log("lowest and highest get error", error);
      }
      while (max--) {
        try {
          loading.stock = true;
          setLoading({ ...loading });
          const stock: StockHistory = await getLastStockInformation(
            process.env.COMPANY_SYMBOL || "FLI"
          );
          loading.stock = false;
          setLoading({ ...loading });
          setCurrentStock(stock);
          break;
        } catch (error) {
          loading.stock = false;
          setLoading({ ...loading });
          console.log("stock get error", error);
          if (Number(error) == 404) {
            currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
            continue;
          }
          break;
        }
      }
    };
    main();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const _open = currentStock.amount;
    const _close = round(_open * (1 + currentStock.percent_change / 100), 2);
    setOpen(_open);
    setClose(_close);
    setChange(_open - _close);
  }, [currentStock]);

  return { currentStock, highest, lowest, loading, open, close, change };
};
export default useStock;
