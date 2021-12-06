import * as React from "react";

import FaviconMetaTags from "@/generated/favicon-meta-tags";

import { createGetInitialProps } from "@mantine/next";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class CustomDocument extends NextDocument {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta content="ie=edge" httpEquiv="X-UA-Compatible" />

          <FaviconMetaTags />
        </Head>

        <body style={{ textRendering: "optimizeLegibility" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
