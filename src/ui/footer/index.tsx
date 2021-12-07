import * as React from "react";

import siteConfig from "@/config/site";

import * as Mantine from "@mantine/core";

export default function Footer() {
  return (
    <Mantine.Box
      component="footer"
      sx={(t) => ({
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",

        paddingBottom: "2rem",
        [`@media (max-width: ${t.breakpoints.xs}px)`]: {
          alignItems: "center",
          textAlign: "center",
        },
      })}
    >
      <Mantine.TypographyStylesProvider sx={{ fontSize: "0.8rem" }}>
        Made using <a href="https://nextjs.org">Next.js</a>, <a href="https://mantine.dev/">Mantine</a>, and{" "}
        <a href="https://sandpack.codesandbox.io">Sandpack</a>.
        <br />
        Source code is available on <a href={siteConfig.links.github}>GitHub</a>.
        <br />
        <br />
        View analytics dashboard on <a href={siteConfig.fathom.dashboard}>Fathom</a> or use our{" "}
        <a href={siteConfig.fathom.referral}>referral link</a>.
        <br />
        <br />
      </Mantine.TypographyStylesProvider>
      <Mantine.Anchor href={siteConfig.links.vercel}>
        <Mantine.Image
          src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
          sx={{ maxWidth: "10rem", width: "100%" }}
        />
      </Mantine.Anchor>
    </Mantine.Box>
  );
}
