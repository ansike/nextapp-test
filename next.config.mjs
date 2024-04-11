/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "p6-passport.byteacctimg.com",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;