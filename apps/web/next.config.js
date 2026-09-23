/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["grad-directories-strange-gale.trycloudflare.com"],
  transpilePackages: ["@repo/db"],
};

export default nextConfig;
