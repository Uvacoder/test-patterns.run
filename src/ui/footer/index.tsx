import * as React from "react";

import siteConfig from "@/config/site";

import * as Mantine from "@mantine/core";

export default function Footer() {
  return (
    <Mantine.Box component="footer" sx={{ paddingBottom: "2rem" }}>
      <Mantine.TypographyStylesProvider
        sx={(t) => ({
          fontSize: "0.8rem",
          [`@media (max-width: ${t.breakpoints.xs}px)`]: {
            textAlign: "center",
          },
        })}
      >
        Made using <a href="https://nextjs.org">Next.js</a>, <a href="https://mantine.dev/">Mantine</a>, and{" "}
        <a href="https://sandpack.codesandbox.io">Sandpack</a>. Hosted on <a href="https://vercel.com/home">Vercel</a>.
        <br />
        Source code is available on <a href={siteConfig.links.github}>GitHub</a>.
        <br />
        <br />
        View analytics dashboard on <a href={siteConfig.fathom.dashboard}>Fathom</a> or use our{" "}
        <a href={siteConfig.fathom.referral}>referral link</a>.
      </Mantine.TypographyStylesProvider>
    </Mantine.Box>
  );
}
