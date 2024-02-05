import { T_Brands } from "@/types/global";

export function getBrandHexColor(brand: T_Brands) {
  const brandColor = {
    Land: "#163E82",
    Prestige: "#956D44",
    Futura: "#E02826",
    Aspire: "#23A0CF",
  };
  return brandColor[brand] ?? "#000000";
}
