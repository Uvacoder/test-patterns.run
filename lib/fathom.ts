/**
 * Fathom analytics client
 *
 * https://github.com/derrickreimer/fathom-client
 */

import { useEffect } from "react";

import siteConfig from "@/config/site";

import * as Fathom from "fathom-client";
import { useRouter } from "next/router";

export const FATHOM_DASHBOARD_URL = "https://app.usefathom.com/share/kczqyzih/console+patterns";
export const FATHOM_REFERRAL_URL = "https://usefathom.com/ref/QHAJTL";

export function FathomSubscription() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV == "production") {
      Fathom.load("KCZQYZIH", {
        includedDomains: [siteConfig.domain],
      });

      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function handleRouteChange() {
  Fathom.trackPageview();
}
