import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  typescript: { tsconfigPath: "tsconfig.cpanel.json" },
};

export default nextConfig;
