import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ABOUT_US_ROUTES from "./helpers/routes/aboutUs";
import INVESTOR_RELATIONS_ROUTES from "./helpers/routes/investorRelations";
import FINANCIALS_ROUTES from "./helpers/routes/financials";
import BUYERS_ROUTES from "./helpers/routes/buyers";
import OUR_BUSINESSES_ROUTES from "./helpers/routes/ourBusinesses";
import { getManatalToken } from "./services/Manatal";
import { DISCLOSURES } from "./helpers/routes/disclosures";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname == "/api/manatal/csrf-token") {
    const token = await getManatalToken(url.searchParams.get("hash") as string);
    return NextResponse.json({ token });
  }
  if (url.pathname === OUR_BUSINESSES_ROUTES.url) {
    url.pathname = OUR_BUSINESSES_ROUTES.RESIDENTIAL.url;
    return NextResponse.redirect(url);
  }
  if (url.pathname === ABOUT_US_ROUTES.STRUCTURES.url) {
    url.pathname = ABOUT_US_ROUTES.STRUCTURES.ORGANIZATIONAL_CHART.url;
    return NextResponse.redirect(url);
  }
  if (url.pathname === ABOUT_US_ROUTES.OUR_LEADERSHIP.url) {
    url.pathname = ABOUT_US_ROUTES.OUR_LEADERSHIP.BOARD_OF_DIRECTORS.url;
    return NextResponse.redirect(url);
  }
  if (url.pathname === INVESTOR_RELATIONS_ROUTES.OUR_COMPANY.url) {
    url.pathname = ABOUT_US_ROUTES.COMPANY_BACKGROUND.url;
    return NextResponse.redirect(url);
  }
  if (url.pathname === INVESTOR_RELATIONS_ROUTES.CORPORATE_GOVERNANCE.url) {
    url.pathname = INVESTOR_RELATIONS_ROUTES.CORPORATE_GOVERNANCE.MANUAL_CORPORATE_GOVERNANCE.url;
    return NextResponse.redirect(url);
  }
  if (url.pathname === INVESTOR_RELATIONS_ROUTES.STRUCTURES.url) {
    url.pathname = ABOUT_US_ROUTES.STRUCTURES.ORGANIZATIONAL_CHART.url;
    return NextResponse.redirect(url);
  }
  if (url.pathname === FINANCIALS_ROUTES.url) {
    url.pathname = FINANCIALS_ROUTES.FINANCIAL_HIGHLIGHTS.url;
    return NextResponse.redirect(url);
  }
  if (url.pathname === INVESTOR_RELATIONS_ROUTES.PRESS_RELEASES.url) {
    url.pathname = "/awards";
    return NextResponse.redirect(url);
  }
  if (url.pathname === BUYERS_ROUTES.url) {
    url.pathname = BUYERS_ROUTES.CALCULATOR.url;
    return NextResponse.redirect(url);
  }
  if (url.pathname === ABOUT_US_ROUTES.url) {
    url.pathname = ABOUT_US_ROUTES.COMPANY_BACKGROUND.url;
    return NextResponse.redirect(url);
  }
  if (url.pathname === INVESTOR_RELATIONS_ROUTES.DISCLOSURES.url) {
    url.pathname = "/disclosures/all";
    return NextResponse.redirect(url);
  }
  if (url.pathname === DISCLOSURES.url) {
    url.pathname = "/disclosures/all";
    return NextResponse.redirect(url);
  }
}
