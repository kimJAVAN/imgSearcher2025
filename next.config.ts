/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/imgSearch2025',
  assetPrefix: "/imgSearch2025/",
  eslint: {
    ignoreDuringBuilds: true, // ✅ 빌드할 때 ESLint 무시
  },
};

module.exports = nextConfig;
