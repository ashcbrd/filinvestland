import "../styles/globals.css";
import MainFooter from "@/components/footer/MainFooter";
import MainNavigation from "@/components/navigation/MainNavigation";
import * as React from "react";
import ReactQueryWrapper from "@/components/tanstack/ReactQueryWrapper";
import { WEB_TITLE } from "@/helpers/constants";
import PrivacyPolicyModal from "@/components/modal/PrivacyPolicyModal";
import ScreenFooter from "@/components/footer/ScreenFooter";
import { getPageContent } from "./page";
import Consent from "@/components/consent";

export const metadata = {
  title: WEB_TITLE,
  description: WEB_TITLE,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getPageContent("639a5782b60dc36e6fc86c93");
  return (
    <html>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <ReactQueryWrapper>
        <body>
          <MainNavigation />
          <main>{children}</main>
          <MainFooter />
          <ScreenFooter content={content} />
          <PrivacyPolicyModal />
          <Consent />
        </body>
      </ReactQueryWrapper>
    </html>
  );
}
