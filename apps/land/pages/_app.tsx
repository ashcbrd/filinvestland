import * as React from "react";
import ReactQueryWrapper from "@/components/tanstack/ReactQueryWrapper";

export default function App({ Component, pageProps }: any) {
  return (
    <ReactQueryWrapper>
      <Component {...pageProps} />
    </ReactQueryWrapper>
  );
}
