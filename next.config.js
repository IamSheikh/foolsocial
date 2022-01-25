const withPwa = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = withPwa({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'production',
  },
})

module.exports = nextConfig
