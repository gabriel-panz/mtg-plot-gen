import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
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

if (process.env.NODE_ENV === 'development') {
	setupDevPlatform().then(() => console.log('dev setup complete'));
}

export default nextConfig;
