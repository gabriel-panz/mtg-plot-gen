import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

const locales = ['en-US', 'pt-BR'];
const defaultLocale = 'en-US';

function getLocale(req: NextRequest) {
	const langHeader = req.headers.get('accept-language') ?? undefined;
	const headers = { 'accept-language': langHeader }
	const languages = new Negotiator({ headers }).languages();
	return match(languages, locales, defaultLocale);
}

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	)

	if (pathnameHasLocale) return;

	const locale = getLocale(req);
	req.nextUrl.pathname = `/${locale}${pathname}`;

	return NextResponse.redirect(req.nextUrl)
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next).*)',
	],
}
