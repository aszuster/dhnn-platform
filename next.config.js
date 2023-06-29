/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["dhnn.com", "media-exp2.licdn.com", "res.cloudinary.com", "lh3.googleusercontent.com", "dummyimage.com"],
  },
}

module.exports = nextConfig
