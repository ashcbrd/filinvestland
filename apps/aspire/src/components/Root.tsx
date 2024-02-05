import Booking from "@/components/Projects/Booking/Booking";
import ProjectProvider from "@/context/Projects";
import CommonProvider from "@/context/Common";
import React from "react";

async function getData() {
  const header = fetch(`${process.env.CMS_URL}/api/globals/aspire-navigation`, {
    cache: "no-store",
  });
  const footer = fetch(`${process.env.CMS_URL}/api/globals/aspire-footer`, {
    cache: "no-store",
  });
  const floating = fetch(
    `${process.env.CMS_URL}/api/globals/aspire-floating-menu?locale=en`,
    { cache: "no-store" }
  );

  const req = await Promise.all([header, footer, floating]);

  return {
    header: (await req[0].json()) as any,
    footer: (await req[1].json()) as any,
    floating: (await req[2].json()) as any,
  };
}

const Root = async ({ children }: { children: React.ReactNode }) => {
  const data = await getData();

  return (
    <>
      <ProjectProvider>
        <CommonProvider
          header={data.header}
          footer={data.footer}
          floating={data.floating}
        >
          {children}
          <Booking />
        </CommonProvider>
      </ProjectProvider>
    </>
  );
};

export default Root;
