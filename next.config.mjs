/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-cardapio-digital.s3.us-west-1.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
