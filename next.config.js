/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
          {
            key: 'Content-Security-Policy',
            // 🔽 IMPORTANTE: lista explícita de sitios que pueden embeber tu app
            value:
              "frame-ancestors 'self' https://trackingdatax.com https://www.trackingdatax.com http://localhost:5500;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
