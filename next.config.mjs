import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/archive',
        permanent: false,
      },
      {
        source: '/esloquees',
        destination: '/archive',
        permanent: true,
      },
      {
        source: '/esloquees/:path*',
        destination: '/archive/:path*',
        permanent: true,
      },
      {
        source: '/archive/folder-structures-and-architecture',
        destination: '/archive/architecture',
        permanent: true,
      },
      {
        source: '/tracker',
        destination: '/ai/curriculum',
        permanent: false,
      },
      {
        source: '/curriculum',
        destination: '/ai/curriculum',
        permanent: false,
      },
      {
        source: '/ai-tracker',
        destination: '/ai/curriculum',
        permanent: false,
      },
      {
        source: '/ai-engineering-tracker',
        destination: '/ai/curriculum',
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
