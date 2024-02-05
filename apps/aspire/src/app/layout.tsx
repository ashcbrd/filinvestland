import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Root from "@/components/Root";
import Script from "next/script";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden">
        <Root>{children}</Root>
        <Script src="https://js.zohocdn.com/ichat/js/2fc051ba_wmsbridge.js" />
      </body>
    </html>
  );
};

export default RootLayout;
