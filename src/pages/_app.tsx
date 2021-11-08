import "@/stylesheets/index.css";

import * as React from "react";

import config from "@/config/site";
import { FathomSubscription } from "@/lib/fathom";
import Footer from "@/ui/footer";
import Header from "@/ui/header";

import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

function Seo() {
  const router = useRouter();

  return (
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
  );
}

function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </Head>

      <Seo />

      <FathomSubscription />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}
