// This middleware is for clerk
'use server';

import { clerkMiddleware } from "@clerk/nextjs/server";


export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};