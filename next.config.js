/** @type {import('next').NextConfig} */

const withMdx = require("@next/mdx")({
  // By default only the .mdx extension is supported.
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMdx({
  // Support MDX files as pages:
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
});

const nextConfig = {};

module.exports = nextConfig;
