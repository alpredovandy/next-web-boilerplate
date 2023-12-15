import { type NextRequest, NextResponse } from "next/server";

import { APP_ENV, BLOG_URL } from "@constants/configs";
import { NOT_FOUND_PAGE } from "@constants/routes";

const PUBLIC_FILE_PATTERN = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname, locale } = request.nextUrl;

  if (
    (pathname.includes("/new") || pathname.includes("/hide")) &&
    APP_ENV === "production"
  ) {
    return NextResponse.redirect(new URL(NOT_FOUND_PAGE, request.url));
  }

  if (
    pathname.startsWith("/_next/image") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE_PATTERN.test(pathname)
  ) {
    return;
  }

  if (pathname.startsWith("/blog")) {
    return NextResponse.redirect(String(BLOG_URL).replace("/blog", pathname));
  }

  if (locale === "default") {
    const locale = request.cookies.get("NEXT_LOCALE")?.value ?? "id";

    return NextResponse.redirect(
      new URL(
        `/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`,
        request.url,
      ),
    );
  }
}
