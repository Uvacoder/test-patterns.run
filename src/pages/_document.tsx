import * as React from "react";

import FaviconMetaTags from "~generated/favicon-meta-tags";

import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta content="ie=edge" httpEquiv="X-UA-Compatible" />

          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
          <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Cousine&display=swap" rel="stylesheet" />

          <FaviconMetaTags />
        </Head>

        <body
          className="antialiased text-gray-100 bg-indigo-900 selection:bg-indigo-600"
          style={{ textRendering: "optimizeLegibility" }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
