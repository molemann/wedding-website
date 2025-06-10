/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['github.com'],
  },
  trailingSlash: true,
};

module.exports = nextConfig; 