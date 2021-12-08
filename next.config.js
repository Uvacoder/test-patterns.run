const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const log = require("next/dist/build/output/log");

const { default: dedent } = require("ts-dedent");

const csp = dedent`
  child-src 'self' blob: *.codesandbox.io;
  connect-src *;
  default-src 'self';
  font-src 'self';
  img-src * blob: data:;
  media-src 'none';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.usefathom.com;
  style-src 'self' 'unsafe-inline';
`;

/** @returns {import("next/dist/server/config-shared").NextConfig} */
module.exports = (phase) => ({
  env: {
    VERCEL: phase == PHASE_DEVELOPMENT_SERVER ? true : process.env.VERCEL,
  },

  // https://github.com/vercel/next.js/blob/canary/packages/next/server/config-shared.ts#L110
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
    workerThreads: true,
  },

  // https://nextjs.org/docs/api-reference/next.config.js/headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
          {
            key: "Content-Security-Policy",
            value: csp.replace(/\n/g, ""),
          },

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
          // Opt-out of Google FLoC: https://amifloced.org/
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
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

  // https://nextjs.org/docs/basic-features/image-optimization#domains
  images: {
    domains: [
      //
    ],
  },

  // https://nextjs.org/docs/advanced-features/source-maps
  productionBrowserSourceMaps: true,

  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,

  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  async redirects() {
    return [
      //
    ];
  },

  // https://nextjs.org/docs/api-reference/next.config.js/rewrites
  async rewrites() {
    return [
      //
    ];
  },

  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  webpack(config, { dev, isServer, webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: dev,
        __PROD__: !dev,
      }),
    );

    if (!dev && !isServer) {
      log.info("Replacing react and react-dom with preact");

      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
  },
});
