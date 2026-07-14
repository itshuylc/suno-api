/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|html)$/i,
      type: 'asset/resource'
    });
    return config;
  },
  experimental: {
    serverMinification: true,
    serverComponentsExternalPackages: [
      '@playwright/browser-chromium',
      'playwright',
      'playwright-core',
      'rebrowser-playwright-core',
      'electron'
    ],
    outputFileTracingIncludes: {
      "/api/generate": [
        "./node_modules/rebrowser-playwright-core/.local-browsers/**/*",
      ],
      "/api/custom_generate": [
        "./node_modules/rebrowser-playwright-core/.local-browsers/**/*",
      ],
      "/v1/chat/completions": [
        "./node_modules/rebrowser-playwright-core/.local-browsers/**/*",
      ],
    },
  },
};

export default nextConfig;
