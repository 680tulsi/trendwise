import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      // Dusre domains bhi yaha add kar sakta hai
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname;
    return config;
  },
};

export default nextConfig;
