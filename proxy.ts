import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";
import { parse } from "cookie";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const privateRoutes = ["/profile", "/notes"];
  const publicOnlyRoutes = ["/sign-in", "/sign-up"];

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicOnlyRoute = publicOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  let response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const apiRes = await checkSession();
      const setCookie = apiRes.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        cookieArray.forEach((cookieStr) => {
          const parsed = parse(cookieStr);
          const [name, value] = Object.entries(parsed)[0];
          if (name === "accessToken") accessToken = value;

          response.cookies.set(name, value, {
            path: parsed.Path,
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            maxAge: Number(parsed["Max-Age"]),
            httpOnly: true,
          });
        });
      }
    } catch (error) {
      console.error("Middleware session refresh failed:", error);
    }
  }

  const isAuthorized = !!accessToken;

  if (isPrivateRoute && !isAuthorized) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicOnlyRoute && isAuthorized) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export default proxy;

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
