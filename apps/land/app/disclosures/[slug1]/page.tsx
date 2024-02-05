import Content from "@/components/pages/investor-relations/disclosures/Content";
import { metaBuilder } from "@/helpers/metaBuilder";
import { round } from "@/helpers/methods";
import {
  StockHistory,
  getHightestAndLowest,
  getLastStockInformation,
} from "@/services/PSE";

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

const DISCLOSURES_PAGE_ID = "6403761dcda32af5e1100236";
export async function generateMetadata() {
  const content = await getPageContent(DISCLOSURES_PAGE_ID);
  return metaBuilder(content);
}

interface Props {
  params: {
    slug1: string;
  };
  searchParams: {
    page: number;
  };
}

const DisclosuresPage = async (props: Props) => {
  const content = await getPageContent(DISCLOSURES_PAGE_ID);
  /* const { title, breadcrumbs, image, imageSmall } = HEADER_INFO.disclosures; */

  return (
    <Content
      searchParams={props.searchParams}
      content={content}
      slug={props.params.slug1}
    />
  );
};

export default DisclosuresPage;
