/**
 * Fathom analytics client
 *
 * https://github.com/derrickreimer/fathom-client
 */

import { useEffect } from "react";

import siteConfig from "@/config/site";

import * as Fathom from "fathom-client";
import { useRouter } from "next/router";

function handleRouteChange() {
  Fathom.trackPageview();
}

export function FathomSubscription() {
  const router = useRouter();

  useEffect(() => {
    if (__PROD__) {
      Fathom.load(siteConfig.fathom.id, {
        includedDomains: siteConfig.domains,
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
