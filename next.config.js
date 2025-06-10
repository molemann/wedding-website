/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['github.com'],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/wedding-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wedding-website/' : '',
  trailingSlash: true,
};

module.exports = nextConfig; 