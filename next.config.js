// https://github.com/leerob/leerob.io/blob/9adc510cbfb3da88c3b0ad15632eb876ca91b607/next.config.js#L39-L49
const csp = `
  child-src 'self' blob: cdn.jsdelivr.net;
  connect-src *;
  default-src 'self';
  font-src 'self' cdn.jsdelivr.net fonts.gstatic.com;
  img-src * blob: data:;
  media-src 'none';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' cdn.jsdelivr.net fonts.googleapis.com;
`;

/** @type {import("next/dist/server/config-shared").NextConfig} */
module.exports = {
  // https://github.com/vercel/next.js/blob/736db423528e66d3d8f7aa1174a3b5310d2a57a9/packages/next/server/config-shared.ts#L73-L99
  experimental: {
    conformance: true,
    optimizeCss: true,
    optimizeImages: true,
    scrollRestoration: true,
    stats: true,
    workerThreads: true,
  },

  // https://github.com/vercel/next.js/blob/736db423528e66d3d8f7aa1174a3b5310d2a57a9/packages/next/server/config-shared.ts#L66-L72
  future: {
    strictPostcssConfiguration: true,
  },

  // https://nextjs.org/docs/api-reference/next.config.js/headers
  // https://github.com/leerob/leerob.io/blob/9adc510cbfb3da88c3b0ad15632eb876ca91b607/next.config.js#L51-L88
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
          {
            key: "Cache-Control",
            value: "public, s-maxage=1, stale-while-revalidate=59",
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
          {
            key: "Content-Security-Policy",
            value: csp.replace(/\n/g, ""),
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
          // Opt-out of Google FLoC: https://amifloced.org/
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
          {
            key: "X-Frame-Options",
            value: "DENY",
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },

  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,

  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  /**
   * @param {import("webpack").Configuration} config
   * @param {{dev:boolean;isServer:boolean}} opts
   */
  webpack(config, { dev, isServer }) {
    // https://github.com/leerob/leerob.io/blob/9adc510cbfb3da88c3b0ad15632eb876ca91b607/next.config.js#L27-L33
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
  },
};
