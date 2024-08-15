/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false, // process.env.NODE_ENV === "development"
  workboxOptions: {
    disableDevLogs: true,
  },
});
export default withPWA({
  images: {
    domains: ["files.edgestore.dev"],
  },
  reactStrictMode: true,
});
