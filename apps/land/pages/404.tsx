import "../styles/globals.css";
import MainNavigation from "@/components/navigation/MainNavigation";
import Content from "@/components/pages/404/Content";
import MainFooter from "@/components/footer/MainFooter";
import { FAVICON_NAME } from "@/helpers/constants";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found</title>
        <link rel="icon" type="image/x-icon" href={`/${FAVICON_NAME}`} />
      </Head>
      <MainNavigation className="bg-royal-dark-blue bg-opacity-40" />
      <Content />
      <MainFooter />
    </>
  );
}
