import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Configure for GitHub Pages static export
  output: 'export',
  reactStrictMode: true, // PRESERVE: Custom feature
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  // Sass configuration
  sassOptions: {
    includePaths: ['./src/assets/scss'],
    silenceDeprecations: ['import'], // Silence @import deprecation warnings
  },

  // Turbopack configuration
  turbopack: {
    rules: {},
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  // Experimental features
  experimental: {
    // Enable optimizations for FontAwesome packages
    optimizePackageImports: [
      '@fortawesome/react-fontawesome',
      '@fortawesome/fontawesome-svg-core',
    ],
  },
};

// Wrap with MDX support
const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Apply MDX wrapper
let config = withMDX(nextConfig);

// Only apply bundle analyzer when not using Turbopack
// Bundle analyzer requires Webpack, so we skip it when Turbopack is active
if (process.env.TURBOPACK !== '1' && process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  config = withBundleAnalyzer(config);
}

export default config;
