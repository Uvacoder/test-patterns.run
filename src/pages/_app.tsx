import "@codesandbox/sandpack-react/dist/index.css";

import * as React from "react";

import siteConfig from "@/config/site";
import { FathomSubscription } from "@/lib/fathom";
import customTheme from "@/theme/mantine";
import PageBorder from "@/ui/core/page-border";
import ScrollToTop from "@/ui/core/scroll-to-top";
import Footer from "@/ui/footer";
import Header from "@/ui/header";

import { Container, MantineProvider, Space } from "@mantine/core";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

function Seo() {
  const router = useRouter();

  return (
    <DefaultSeo
      canonical={siteConfig.url + (router.asPath || "")}
      description={siteConfig.description}
      openGraph={{
        title: siteConfig.title,
        description: siteConfig.description,
        type: "website",
        site_name: siteConfig.title,
        images: [{ url: `${siteConfig.url}/social.png` }],
      }}
      titleTemplate={`%s • ${siteConfig.title}`}
    />
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>

      <FathomSubscription />
      <Seo />

      <MantineProvider theme={customTheme} withGlobalStyles withNormalizeCSS>
        <PageBorder />
        <Container sx={(t) => ({ padding: t.spacing.md })}>
          <Header />
          <Space h="lg" />
          <Component {...pageProps} />
          <Space h="lg" />
          <Footer />
        </Container>
        <ScrollToTop />
      </MantineProvider>
    </>
  );
}
