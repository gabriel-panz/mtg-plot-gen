import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cards.scryfall.io',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'upload.wikimedia.org',
				pathname: '**',
				port: ''
			}
		],
	}
};

export default nextConfig;
