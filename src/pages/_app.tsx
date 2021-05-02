import "@/stylesheets/index.css";

import * as React from "react";

import config from "~/site-config";
import Layout from "@/components/layout";

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
        title="Gallery"
        titleTemplate={`%s • ${config.title}`}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
