/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    largePageDataBytes: 128 * 1000000,
  },
  optimizeFonts: true,
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
