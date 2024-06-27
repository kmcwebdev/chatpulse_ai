/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	remotePatterns: [
		{
			protocol: 'https',
			hostname: process.env.PUBLIC_CONVEX_URL,
			port: '',
		},
	],
	},
};

export default nextConfig;
