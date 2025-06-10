/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/maps/**',
      },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig; 