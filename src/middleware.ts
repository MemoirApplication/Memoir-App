'use server';

// Clerk middleware
import { clerkMiddleware } from "@clerk/nextjs/server";


export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Auth.js middleware
export { auth as middleware } from "@/auth"