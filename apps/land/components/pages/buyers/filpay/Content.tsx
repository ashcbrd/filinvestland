import React from "react";
import MainHeader from "@/components/header/MainHeader";
import OnlinePaymentSection from "@/components/pages/buyers/filpay/OnlinePaymentSection";

const Content = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "filpay-online-payments-section"
  );

  return (
    <>
      <MainHeader title={content?.title ?? "FilpayAll"} bgUrl={data.mainHeaderImage.url} />
      <iframe className="h-screen w-full" src="https://filinvest.xyz/filpay/v3/" />
    </>
  );
};

export default Content;
