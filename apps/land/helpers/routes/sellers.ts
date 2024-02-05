export const SELLERS = {
  url: "/sellers",
  name: "Sellers",
  directory: ["Sellers"],
};
const SELLER_HUB = {
  url: `${SELLERS.url}/seller-hub`,
  name: "Seller's Hub",
  directory: [...SELLERS.directory, "Seller's Hub"],
};
const SELLER_ACCREDITATION_TOOL = {
  url: `${SELLERS.url}/seller-accreditation-tool`,
  name: "Seller Accreditation Tool",
  directory: [...SELLERS.directory, "Seller Accreditation Tool"],
};
const SELLERS_ROUTES = { ...SELLERS, SELLER_HUB, SELLER_ACCREDITATION_TOOL };
export const SELLERS_SUB_ROUTES = [SELLER_HUB, SELLER_ACCREDITATION_TOOL];
export default SELLERS_ROUTES;
