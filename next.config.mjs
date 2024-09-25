import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dfx6ax10jig7t.cloudfront.net',
        port: '',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
