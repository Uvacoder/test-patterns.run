import "~stylesheets/index.css";

import * as React from "react";

import Footer from "~components/footer";
import Header from "~components/header";
import config from "~config/site";

import { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </Head>

      <DefaultSeo
        canonical={config.url + (router.asPath || "")}
        description={config.description}
        openGraph={{
          title: config.title,
          description: config.description,
          type: "website",
          site_name: config.title,
          images: [{ url: `${config.url}/social.png` }],
        }}
        titleTemplate={`%s • ${config.title}`}
      />

      <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
