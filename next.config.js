/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/wedding-website',
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