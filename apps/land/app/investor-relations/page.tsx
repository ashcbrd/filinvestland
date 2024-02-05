import { metaBuilder } from "@/helpers/metaBuilder";
import Content from "@/components/pages/investor-relations/Content";
import {
  StockHistory,
  getHightestAndLowest,
  getLastStockInformation,
} from "@/services/PSE";
import { round } from "@/helpers/methods";

async function getPageContent(id: string) {
  const res = await fetch(`${process.env.CMS_URL}/api/pages/${id}`, {
    cache: "no-store",
  });
  let currentStock: StockHistory = {
    amount: 0,
    currency: "",
    date: new Date(),
    name: "",
    percent_change: 0,
    symbol: "",
    volume: 0,
  };
  try {
    currentStock = await getLastStockInformation();
  } catch (error) {
    console.log(error);
  }
  let highestAndLowest: any;
  try {
    highestAndLowest = await getHightestAndLowest();
  } catch (error) {
    highestAndLowest = {};
  }
  let open = currentStock.amount;
  let close = open * (1 + currentStock.percent_change / 100);
  let change = round(open - close, 2);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  let content = await res.json();
  content?.content?.push({
    blockType: "stock-information",
    stock: {
      currentStock,
      ...highestAndLowest,
      open,
      close,
      change,
    },
  });
  return content;
}

export async function generateMetadata() {
  const content = await getPageContent("640594d02dd194ccf101c72e");
  return metaBuilder(content);
}

const InvestorRelationsPage = async () => {
  const content = await getPageContent("640594d02dd194ccf101c72e");
  return <Content content={content} />;
};

export default InvestorRelationsPage;
