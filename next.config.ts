import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Keep it externalized from standard server bundling chunks
  serverExternalPackages: ['@prisma/client'],

  // 2. Force Next.js to transparently transpile the Prisma engines 👈 THE FIX
  transpilePackages: ['@prisma/client'],
};

export default nextConfig;
