/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/wedding-website',
  assetPrefix: '/wedding-website/',
};

module.exports = nextConfig; 