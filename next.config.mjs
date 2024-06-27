/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'accurate-crow-6.convex.cloud',
        port: '',
      },
    ],
  },
};

export default nextConfig;
