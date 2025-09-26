/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/imgSearcher2025',
  assetPrefix: './', 
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;
