export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/app/:path*",
    "/tasks/:path*",
    "/api/:path*",
    "/api/tasks/:path*"
  ],
};
