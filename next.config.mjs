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
    ];
  },
};

export default withMDX(config);
